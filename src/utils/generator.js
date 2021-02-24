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
Blockly.B59.ORDER_FIRST_PASS = 10
Blockly.B59.ORDER_SECOND_PASS = 20
Blockly.B59.ORDER_NONE = 99
Blockly.B59.RESERVED_WORDS_ = ''

Blockly.B59.init = (workspace) => {
  Blockly.B59.cf = clownface({ dataset: dataset() })

  if (!Blockly.B59.variableDB_) {
    Blockly.B59.variableDB_ = new Blockly.Names(Blockly.B59.RESERVED_WORDS_)
  } else {
    Blockly.B59.variableDB_.reset()
  }

  Blockly.B59.variableDB_.setVariableMap(workspace.getVariableMap())
  Blockly.B59.defvars_ = Blockly.Variables.allUsedVarModels(workspace)
}
Blockly.B59.finish = (code) => {
  return turtle`${Blockly.B59.cf.dataset}`.toString().replace(/ rdf:type /g, ' a ')
}

Blockly.B59['p:Pipeline'] = (block) => {
  const pipelineIRI = block.getFieldValue('NAME')
  const variablesPointer = Blockly.B59.cf.blankNode('variables')

  Blockly.B59.cf.namedNode(pipelineIRI)
    .addOut(ns.rdf.type, ns.p.Pipeline)
    .addOut(ns.rdf.type, ns.p.Readable)
    .addOut(ns.p.variables, variablesPointer)
    .addOut(ns.p.steps, Blockly.B59.cf.namedNode(`${pipelineIRI}/steps`))

  Blockly.B59.statementToCode(block, 'VARIABLES')
  Blockly.B59.statementToCode(block, 'STEPLIST')
  return ''
}

Blockly.B59.plists_create_with = (block) => {
  for (let i = 0; i < block.itemCount_; i++) {
    Blockly.B59.valueToCode(block, 'ADD' + i, Blockly.B59.ORDER_NONE)
  }
  return ''
}

Blockly.B59.variables_get_dynamic = (block) => {
  return ''
}

Blockly.B59.variables_set_dynamic = (block) => {
  const id = block.getFieldValue('VAR')

  if (/b[0-9]+/.test(block.data)) {
    const variable = Blockly.B59.variableDB_.variableMap_.variableMap_['p:Variable'].find(({ id_ }) => id_ === id)
    variable.data = block.data
    variable.value = block.getFieldValue('VALUE')

    const var1 = Blockly.B59.cf.blankNode()
      .addOut(ns.rdf.type, ns.p.Variable)
      .addOut(ns.p.name, variable.name)
      .addOut(ns.p.value, variable.value)
    Blockly.B59.cf.blankNode('variables').addOut(ns.p.variable, var1)
  } else if (block.data !== '@base') {
    Blockly.B59.cf.blankNode('variables').addOut(ns.p.variable, Blockly.B59.cf.namedNode(block.data))

    const definedVariable = Blockly.B59.defvars_.find(({ id_ }) => id_ === id)

    Blockly.B59.cf.namedNode(block.data)
      .addOut(ns.rdf.type, ns.p.Variable)
      .addOut(ns.p.name, definedVariable.name)
      .addOut(ns.p.value, block.getFieldValue('VALUE'))
  }

  const nextBlock = block.nextConnection && block.nextConnection.targetBlock()
  Blockly.B59.blockToCode(nextBlock)
  return ''
}

Blockly.B59['code:EcmaScript'] = (block) => {
  const value = block.getFieldValue('ECMASCRIPTCODE')
  return [value, Blockly.B59.ORDER_NONE]
}
