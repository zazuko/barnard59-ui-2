<template>
  <div id="app">
    <blockly-component id="blockly-workspace" :options="options" ref="main"></blockly-component>
    <div id="code">
      <button @click="showCode()">Show JavaScript</button>
      <button @click="toXML()">Show XML</button>
      <button @click="fromXML()">Load XML</button>
      <button @click="parseTurtle()">Parse Turtle</button>
      <textarea v-model="code"></textarea>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-useless-escape */
import './style.css'
import BlocklyComponent from './components/BlocklyComponent.vue'
import './blocks/b59'

import Blockly from 'blockly'
import BlocklyB59 from './utils/generator'
import { TypedVariableModal } from '@blockly/plugin-typed-variable-modal'
import { parseTurtle } from './utils/utils'
const createFlyout = (workspace) => {
  let xmlList = []
  // Add your button and give it a callback name.
  const button = document.createElement('button')
  button.setAttribute('text', 'Create Typed Variable')
  button.setAttribute('callbackKey', 'callbackName')

  xmlList.push(button)

  // This gets all the variables that the user creates and adds them to the
  // flyout.
  const blockList = Blockly.VariablesDynamic.flyoutCategoryBlocks(workspace)
  xmlList = xmlList.concat(blockList)
  return xmlList
}

const ttl = `
@base <http://example.org/pipeline/> .
@prefix code: <https://code.described.at/> .
@prefix p: <https://pipeline.described.at/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

<utc> a p:Pipeline, p:Readable ;
  p:variables [
    p:variable [
      a p:Variable;
      p:name "url" ;
      p:value "http://worldtimeapi.org/api/timezone/etc/UTC" ;
    ] ,
    <dateContext>
  ] ;
  p:steps <steps> .

<dateContext>
  a p:Variable;
  p:name "context" ;
  p:value """{"date\":"http://purl.org/dc/elements/1.1/date"}""" .

<steps>
  p:stepList ( <fetch> <jsonldStructure> <parse> <serialize> ) .

<fetch> a p:Step ;
  code:implementedBy [
    code:link <node:barnard59-base#fetch.json> ;
    a code:EcmaScript
  ];
  code:arguments ("url"^^p:VariableName) .

<jsonldStructure> a p:Step ;
  code:implementedBy [
    code:link <node:barnard59-base#map> ;
    a code:EcmaScript
  ];
  code:arguments ("json => { return { '@context': JSON.parse(this.variables.get('context')), '@id': this.variables.get('url'), date: json.datetime } }"^^code:EcmaScript) .

<parse> a p:Step ;
  code:implementedBy [
    code:link <node:barnard59-formats#jsonld.parse.object> ;
    a code:EcmaScript
  ] .

<serialize> a p:Step ;
  code:implementedBy [
    code:link <node:barnard59-formats#ntriples.serialize> ;
    a code:EcmaScript
  ] .
`

const toolbox = `
<xml>
  <category name="Pipeline" colour="%{BKY_LOOPS_HUE}">
    <block type="p:Pipeline">
      <field name="NAME">my-pipeline</field>
    </block>
    <block type="p:Step">
      <field name="OPERATION">barnard59-base#map</field>
    </block>
    <block type="p:Variable">
      <field name="NAME">url</field>
      <field name="VALUE">http://worldtimeapi.org/api/timezone/etc/UTC</field>
    </block>
    <block type="p:VariableName">
      <field name="VARIABLENAME">variableName</field>
    </block>
    <block type="code:EcmaScript">
      <field name="ECMASCRIPTCODE">(x) => x * 2</field>
    </block>
  </category>
  <category name="Lists">
    <block type="plists_create_with"></block>
  </category>
  <category name="Variables" custom="CREATE_TYPED_VARIABLE" colour="%{BKY_VARIABLES_HUE}"></category>
</xml>
`

export default {
  name: 'app',
  components: {
    BlocklyComponent
  },
  mounted () {
    const workspace = this.$refs.main.workspace
    workspace.registerToolboxCategoryCallback('CREATE_TYPED_VARIABLE', createFlyout)
    const typedVarModal = new TypedVariableModal(workspace, 'callbackName', [['p:Variable', 'p:Variable'], ['p:Variable', 'p:Variable']])
    typedVarModal.init()
  },
  data () {
    return {
      code: ttl,
      options: {
        media: 'media/',
        grid:
          {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
          },
        toolbox
      }
    }
  },
  methods: {
    showCode () {
      this.code = BlocklyB59.workspaceToCode(this.$refs.main.workspace)
    },
    toXML () {
      const xmlDom = Blockly.Xml.workspaceToDom(this.$refs.main.workspace)
      const xml = Blockly.Xml.domToPrettyText(xmlDom)
      this.code = xml
    },
    fromXML () {
      try {
        const dom = Blockly.Xml.textToDom(this.code)
        Blockly.mainWorkspace.clear()
        Blockly.Xml.domToWorkspace(dom, this.$refs.main.workspace)
        return true
      } catch (e) {
        console.error('XML parsing failed')
        return false
      }
    },
    async parseTurtle () {
      const xml = await parseTurtle(this.code)
      const strXML = xml.end({ prettyPrint: true })
      console.log(strXML)

      const dom = Blockly.Xml.textToDom(strXML)
      Blockly.mainWorkspace.clear()
      Blockly.Xml.domToWorkspace(dom, this.$refs.main.workspace)
    }
  }
}
</script>
