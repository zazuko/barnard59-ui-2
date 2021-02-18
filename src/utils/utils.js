import cf from 'clownface'
import formats from '@rdfjs/formats-common'
import namespace from '@rdfjs/namespace'
import rdf from 'rdf-ext'
import stringToStream from 'string-to-stream'
import { create } from 'xmlbuilder2'
const parser = formats.parsers.get('text/turtle')

const ns = {
  schema: namespace('http://schema.org/'),
  rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
  p: namespace('https://pipeline.described.at/'),
  code: namespace('https://code.described.at/')
}

export async function turtleToCF (str) {
  const stream = stringToStream(str)
  const quadStream = parser.import(stream)
  return cf({ dataset: await rdf.dataset().import(quadStream) })
}

export async function parseTurtle (code) {
  const cf = await turtleToCF(code)
  return getIdentifiers(cf)
}

function getIdentifiers (graph) {
  const doc = create().ele('https://developers.google.com/blockly/xml', 'xml')

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

      let vXML = pXML
        .ele('value', { name: 'VARIABLES' })
        .ele('block', { type: 'variables_list' })
        .ele('statement', { name: 'STACK' })

      variables
        .forEach((variable, index, { length: lastIndex }) => {
          vXML = vXML
            .ele('block', { type: 'p:Variable' })
            .ele('field', { name: 'NAME' })
            .txt(variable.name)
            .up()
            .ele('data')
            .txt(variable.iri)
            .up()
            .ele('field', { name: 'VALUE' }).txt(variable.value)
            .up()
          if (index < lastIndex - 1) {
            vXML = vXML.ele('next')
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
          const identifier = codeLink.term
          const args = Array.from(step.out(ns.code.arguments).list())

          const [, ...operationParts] = identifier.value.split(':')
          const operationName = operationParts.join(':')
          sXML = sXML
            .ele('block', { type: 'p:Step' })
            .ele('field', { name: 'NAME' })
            .txt(step.term.value)
            .up()
            .ele('field', { name: 'OPERATION' })
            .txt(operationName)
            .up()

          const op = sXML
          args
            .forEach((arg) => {
              const datatype = arg.term.datatype
              if (datatype.equals(ns.p.VariableName)) {
                op
                  .ele('value', { name: 'ARGUMENTS' })
                  .ele('block', { type: 'p:VariableName' })
                  .ele('field', { name: 'VARIABLENAME' })
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
