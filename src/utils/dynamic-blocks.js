import namespace from '@rdfjs/namespace'
import { urlToCF } from './utils'
import * as Blockly from 'blockly/core'

const manifestsFiles = [
  'manifest-barnard59-base.ttl',
  'manifest-barnard59-core.ttl',
  'manifest-barnard59-csvw.ttl',
  'manifest-barnard59-formats.ttl',
  'manifest-barnard59-ftp.ttl',
  'manifest-barnard59-graph-store.ttl',
  'manifest-barnard59-http.ttl',
  'manifest-barnard59-rdf.ttl',
  'manifest-barnard59-shell.ttl',
  'manifest-barnard59-sparql.ttl'
]

const ns = {
  schema: namespace('http://schema.org/'),
  rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#'),
  rdfs: namespace('http://www.w3.org/2000/01/rdf-schema#'),
  p: namespace('https://pipeline.described.at/'),
  code: namespace('https://code.described.at/')
}

export async function init () {
  let manifests = await Promise.all(
    manifestsFiles.map((file) => urlToCF(`./manifests/${file}`))
  )
  manifests = manifests.map((cf, i) => {
    const lib = manifestsFiles[i].split('-').slice(1).join('-').split('.')[0]
    return [lib, cf]
  })

  return manifests.map(([lib, cf], i) => {
    return cf
      .has(ns.rdf.type, ns.p.Operation)
      .map(operation => {
        const label = operation.out(ns.rdfs.label).term.value

        const implementedBy = operation.out(ns.code.implementedBy)
        const codeLink = implementedBy.out(ns.code.link)
        const blockName = codeLink.term.value

        Blockly.Blocks[blockName] = {
          init () {
            this._dynamicBlock = true
            this._pipeTypes = ['p:Step']

            this.appendDummyInput()
              .appendField(`${label} (${lib})`)

            this.appendDummyInput()
              .appendField('Step')
              .appendField(new Blockly.FieldTextInput('Name'), 'NAME')

            this.appendValueInput('ARGUMENTS')
              .appendField('Arguments')
              .setCheck(['p:Variable', 'code:EcmaScript', 'Array'])

            this.setColour((185 + i * 30) % 360)
            this.setTooltip(operation.out(ns.rdfs.comment).term.value)
            this.setHelpUrl(operation.term.value)
            const isReadable = operation.has(ns.rdf.type, ns.p.Readable).values.length
            const isWritable = operation.has(ns.rdf.type, ns.p.Writable).values.length
            const isReadableObjectMode = operation.has(ns.rdf.type, ns.p.ReadableObjectMode).values.length
            const isWritableObjectMode = operation.has(ns.rdf.type, ns.p.WritableObjectMode).values.length

            if (isWritable) {
              this.setPreviousStatement(true, ['p:Pipeline', 'p:Readable'])
              this._pipeTypes.push('p:Writable')
            } else if (isWritableObjectMode) {
              this.setPreviousStatement(true, ['p:Pipeline', 'p:ReadableObjectMode'])
              this._pipeTypes.push('p:WritableObjectMode')
            } else {
              this.setPreviousStatement(true, ['p:Pipeline'])
            }
            if (isReadable) {
              this.setNextStatement(true, ['p:Writable'])
              this._pipeTypes.push('p:Readable')
            } else if (isReadableObjectMode) {
              this.setNextStatement(true, ['p:WritableObjectMode'])
              this._pipeTypes.push('p:ReadableObjectMode')
            }
          }
        }

        Blockly.B59[blockName] = stepTemplate(blockName)

        return `
          <block type="${blockName}">
            <field name="NAME"></field>
          </block>
        `
      }).join('\n')
  }).join('\n')
}

const stepTemplate = (blockName) => (block) => {
  const name = block.getFieldValue('NAME')

  const implementedBy = Blockly.B59.cf.blankNode()
    .addOut(ns.code.link, Blockly.B59.cf.namedNode(blockName))
    .addOut(ns.rdf.type, ns.code.EcmaScript)

  const meat = Blockly.B59.cf.namedNode(name)
    .addOut(ns.rdf.type, ns.p.Step)
    .addOut(ns.code.implementedBy, implementedBy)
  if (Blockly.B59.valueToCode(block, 'ARGUMENTS', Blockly.B59.ORDER_NONE)) {
    meat.addList(ns.code.arguments, [
      Blockly.B59.cf.literal(Blockly.B59.valueToCode(block, 'ARGUMENTS', Blockly.B59.ORDER_NONE))
    ])
  }

  const nextBlock = block.nextConnection && block.nextConnection.targetBlock()
  Blockly.B59.blockToCode(nextBlock)
  return ''
}
