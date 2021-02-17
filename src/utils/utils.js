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
        .ele('block', { type: 'b:pipeline' })
        .ele('field', { name: 'NAME' })
        .txt(pipeline.value)
        .up()

      const variables = pipeline
        .out(ns.p.variables)
        .out()
        .filter(variable => variable.has(ns.rdf.type, ns.p.Variable))
        .map(variable => ({ name: variable.out(ns.p.name).value, value: variable.out(ns.p.value).value }))

      let vXML = pXML.ele('statement', { name: 'VARIABLES' })

      variables
        .forEach((variable, index, { length: lastIndex }) => {
          vXML = vXML
            .ele('block', { type: 'b:variable' })
            .ele('field', { name: 'NAME' })
            .txt(variable.name)
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

          const [, ...operationParts] = identifier.value.split(':')
          const operationName = operationParts.join(':')
          sXML = sXML
            .ele('block', { type: 'b:step' })
            .ele('field', { name: 'OPERATION' })
            .txt(operationName)
            .up()
          if (index < lastIndex - 1) {
            sXML = sXML.ele('next')
          }
        })
    })

  return doc
}
