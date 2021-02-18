import * as Blockly from 'blockly/core'
import clownface from 'clownface'
import dataset from 'rdf-dataset-indexed'
import namespace from '@rdfjs/namespace'
import { turtle } from '@tpluscode/rdf-string'
import { prefixes } from '@zazuko/rdf-vocabularies'

const prefix = {
  schema: 'http://schema.org/',
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  p: 'https://pipeline.described.at/',
  code: 'https://code.described.at/'
}

const ns = Object.entries(prefix).reduce((acc, [prefix, iri]) => {
  acc[prefix] = namespace(iri)
  return acc
}, {})

Object.entries(prefix).forEach(([prefix, iri]) => {
  prefixes[prefix] = iri
})

export default Blockly.B59 = new Blockly.Generator('B59')

Blockly.B59.ORDER_ATOMIC = 0

Blockly.B59.init = () => {
  Blockly.B59.cf = clownface({ dataset: dataset() })
}
Blockly.B59.finish = (code) => {
  return turtle`${Blockly.B59.cf.dataset}`.toString().replace(/ rdf:type /g, ' a ')
}

Blockly.B59['p:Pipeline'] = (block) => {
  Blockly.B59.cf.namedNode(block.getFieldValue('NAME'))
    .addOut(ns.rdf.type, ns.p.Pipeline)
    .addOut(ns.rdf.type, ns.p.Readable)
  Blockly.B59.statementToCode(block, 'VARIABLES')
  return ''
}

Blockly.B59.variables_list = (block) => {
  Blockly.B59.statementToCode(block, 'STACK')
  return ''
}

Blockly.B59['p:Variable'] = (block) => {
  console.log({ data: block.data })
  Blockly.B59.cf.namedNode(block.data)
    .addOut(ns.rdf.type, ns.p.Variable)
    .addOut(ns.p.name, block.getFieldValue('NAME'))
    .addOut(ns.p.value, block.getFieldValue('VALUE'))
  return ''
}
