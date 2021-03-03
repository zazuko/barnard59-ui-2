import cf from 'clownface'
import formats from '@rdfjs/formats-common'
import namespace from '@rdfjs/namespace'
import rdf from 'rdf-ext'
import fetch from '@rdfjs/fetch-lite'
import stringToStream from 'string-to-stream'
import { create } from 'xmlbuilder2'
const parser = formats.parsers.get('text/turtle')

const ns = {
  schema: namespace('http://schema.org/'),
  rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
  p: namespace('https://pipeline.described.at/'),
  code: namespace('https://code.described.at/')
}

export async function findBase (str) {
  const match = str.match(/^\s*@base\s+<([^>]+)>\s*\./mi)
  if (match) {
    return match[1]
  }
  return ''
}

export async function turtleToCF (str) {
  const stream = stringToStream(str)
  const quadStream = parser.import(stream)
  const graph = cf({ dataset: await rdf.dataset().import(quadStream) })
  const base = await findBase(str)
  if (!base) {
    return graph
  }
  graph.namedNode(ns.p.parsedPipeline)
    .addOut(ns.p.hasBase, base)
  return graph
}

export async function parseTurtle (code) {
  const cf = await turtleToCF(code)
  return turtleToXML(cf)
}

export async function rdfFetch (url) {
  return new Promise((resolve, reject) =>
    fetch(url, { formats })
      .then(res => resolve(res.quadStream()))
      .catch(err => reject(err))
  )
}

export async function urlToCF (url) {
  return cf({ dataset: await rdf.dataset().import(await rdfFetch(url)) })
}

function turtleToXML (graph) {
  const baseQuad = graph.has(ns.p.hasBase)
  const base = baseQuad.term ? baseQuad.out().value : ''

  const doc = create().ele('https://developers.google.com/blockly/xml', 'xml')
  const rootVarXML = doc.ele('variables')
  let lastVariableSetBlock = doc
  const definedVariableNames = new Set()

  graph
    .has(ns.rdf.type, ns.p.Pipeline)
    .forEach(pipeline => {
      const pXML = doc
        .ele('block', { type: 'p:Pipeline' })
        .ele('field', { name: 'NAME' })
        .txt(pipeline.value)
        .up()

      const variables = pipeline
        .out(ns.p.variables)
        .out()
        .filter(variable => variable.has(ns.rdf.type, ns.p.Variable))
        .map(variable => ({
          iri: variable.term.value,
          name: variable.out(ns.p.name).value,
          value: variable.out(ns.p.value).value
        }))

      if (base) {
        variables.push({
          iri: '@base',
          name: '@base',
          value: base
        })
      }

      const vXML = pXML
        .ele('value', { name: 'VARIABLES' })
        .ele('block', { type: 'plists_create_with' })
        .ele('mutation', { items: `${variables.length}` })
        .up()

      variables
        .forEach((variable, index) => {
          // make sure each variable is only defined once
          if (definedVariableNames.has(variable.name)) {
            return
          }
          definedVariableNames.add(variable.name)

          rootVarXML.ele('variable', { type: 'p:Variable' }).txt(variable.name)
          lastVariableSetBlock = lastVariableSetBlock.ele('block', { type: 'variables_set_dynamic' })
            .ele('field', { name: 'VAR', variableType: 'p:Variable' }).txt(variable.name)
            .up()
            .ele('field', { name: 'VALUE' }).txt(variable.value)
            .up()
            .ele('data').txt(variable.iri)
            .up()
            .ele('next')

          if (variable.name !== '@base') {
            vXML
              .ele('value', { name: `ADD${index}` })
              .ele('block', { type: 'variables_get_dynamic' })
              .ele('field', { name: 'VAR', variabletype: 'p:Variable' })
              .txt(variable.name)
          }
        })

      const steps = Array.from(pipeline
        .out(ns.p.steps)
        .out(ns.p.stepList)
        .list())

      let sXML = pXML.ele('statement', { name: 'STEPLIST' })
      steps
        .forEach((step, index, { length: lastIndex }) => {
          const implementedBy = step.out(ns.code.implementedBy)
          const codeLink = implementedBy.out(ns.code.link)
          const args = Array.from(step.out(ns.code.arguments).toArray())

          sXML = sXML
            .ele('block', { type: codeLink.term.value })
            .ele('field', { name: 'NAME' })
            .txt(step.term.value)
            .up()

          const op = sXML
          args
            .forEach((arg) => {
              const datatype = arg.term.datatype
              if (!datatype) {
                return
              }
              if (datatype.equals(ns.p.VariableName)) {
                op
                  .ele('value', { name: 'ARGUMENTS' })
                  .ele('block', { type: 'variables_get_dynamic' })
                  .ele('field', { name: 'VAR', variabletype: 'p:Variable' })
                  .txt(arg.term.value)
                  .up()
              } else if (datatype.equals(ns.code.EcmaScript)) {
                op
                  .ele('value', { name: 'ARGUMENTS' })
                  .ele('block', { type: 'code:EcmaScript' })
                  .ele('field', { name: 'ECMASCRIPTCODE' })
                  .txt(arg.term.value)
                  .up()
              }
            })
          if (index < lastIndex - 1) {
            sXML = sXML.ele('next')
          }
        })
    })

  return doc
}