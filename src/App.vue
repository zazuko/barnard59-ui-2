<template>
  <div id="app">
    <blockly-component
      v-if="options.toolbox"
      id="blockly-workspace"
      :options="options"
      ref="main" />
    <div id="code">
      <div id="buttons">
        <button @click="showCode()">Blocks → Turtle</button>
        <button @click="toXML()">Blocks → XML</button>
        <button @click="fromXML()" v-show="codeType === 'xml'">XML → Blocks</button>
        <button @click="parseTurtle()" v-show="codeType === 'ttl'">Turtle → Blocks</button>
        <select v-model="selectedPipeline">
          <option value="">All pipelines</option>
          <option v-for="pipeline in pipelines" :key="pipeline">
            {{ pipeline }}
          </option>
        </select>
        <span v-show="selectedPipeline">Showing only: {{ selectedPipeline }}</span>
      </div>
      <textarea v-model="code"></textarea>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-useless-escape */
import './style.css'
import BlocklyComponent from './components/BlocklyComponent.vue'
import './blocks/b59'
import './blocks/lists'
import './renderer'

import Blockly from 'blockly'
import BlocklyB59 from './utils/generator'
import { TypedVariableModal } from '@blockly/plugin-typed-variable-modal'
import { init } from './blocks/dynamic-blocks'
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

<cet> a p:Pipeline, p:Readable ;
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
  p:value """{"date":"http://purl.org/dc/elements/1.1/date"}""" .

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
    code:link <node:barnard59-formats/jsonld.js#parse.object> ;
    a code:EcmaScript
  ] .

<serialize> a p:Step ;
  code:implementedBy [
    code:link <node:barnard59-formats/ntriples.js#serialize> ;
    a code:EcmaScript
  ] .
`

const toolbox = (stepsXML) => `
<xml>
  <category name="Pipeline" colour="%{BKY_LOOPS_HUE}">
    <block type="p:Pipeline">
      <field name="NAME">my-pipeline</field>
    </block>
    <block type="code:EcmaScript">
      <field name="ECMASCRIPTCODE">(x) => x * 2</field>
    </block>
    <block type="code:EcmaScriptTemplateLiteral">
      <field name="ECMASCRIPTCODE">Date is \${new Date().toISOString()}</field>
    </block>
  </category>
  <category name="Steps" colour="%{BKY_LOOPS_HUE}">
    ${stepsXML}
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
  async mounted () {
    const stepsXML = await init()
    this.options.toolbox = toolbox(stepsXML)
    setTimeout(() => {
      const workspace = this.$refs.main.workspace
      workspace.registerToolboxCategoryCallback('CREATE_TYPED_VARIABLE', createFlyout)
      const typedVarModal = new TypedVariableModal(workspace, 'callbackName', [['p:Variable', 'p:Variable'], ['p:Variable', 'p:Variable']])
      typedVarModal.init()
      this.parseTurtle()
    }, 400)
  },
  data () {
    return {
      pipelines: [],
      selectedPipeline: '',
      hiddenPipelines: [],
      code: ttl,
      codeType: 'ttl',
      options: {
        media: 'media/',
        grid:
          {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
          },
        toolbox: '',
        renderer: 'custom_renderer'
      }
    }
  },
  watch: {
    selectedPipeline (val, oldVal) {
      const serializer = new XMLSerializer()
      // workspace to xml to string
      const xmlDom = Blockly.Xml.workspaceToDom(this.$refs.main.workspace)
      const pipelines = xmlDom.querySelectorAll('block[type="p:Pipeline"]')
      if (val !== oldVal) {
        for (const p of this.hiddenPipelines) {
          xmlDom.appendChild(p)
        }
        this.hiddenPipelines = []
      }
      if (val) {
        for (const p of pipelines) {
          const name = p.querySelector('field[name="NAME"]')
          if (name && name.innerHTML !== val) {
            // save the hidden pipelines to be able to add them again
            this.hiddenPipelines.push(p)
            p.remove()
          }
        }
      }

      const xmlStr = serializer.serializeToString(xmlDom)

      const dom2 = Blockly.Xml.textToDom(xmlStr)
      Blockly.mainWorkspace.clear()
      Blockly.Xml.domToWorkspace(dom2, this.$refs.main.workspace)
    }
  },
  methods: {
    showCode () {
      this.code = BlocklyB59.workspaceToCode(this.$refs.main.workspace)
      this.codeType = 'ttl'
    },
    toXML () {
      const xmlDom = Blockly.Xml.workspaceToDom(this.$refs.main.workspace)
      const xml = Blockly.Xml.domToPrettyText(xmlDom)
      this.code = xml
      this.codeType = 'xml'
    },
    fromXML (xml) {
      try {
        const dom = Blockly.Xml.textToDom(xml || this.code)
        Blockly.mainWorkspace.clear()
        Blockly.Xml.domToWorkspace(dom, this.$refs.main.workspace)
        return true
      } catch (e) {
        console.error('XML parsing failed')
        console.error(e)
        return false
      }
    },
    async parseTurtle () {
      const [xml, pipelines] = await parseTurtle(this.code)
      this.pipelines = pipelines
      const strXML = xml.end({ prettyPrint: true })
      // console.log(strXML.replace(/ id="[^"]*"/g, ''))

      const dom = Blockly.Xml.textToDom(strXML)
      Blockly.mainWorkspace.clear()
      Blockly.Xml.domToWorkspace(dom, this.$refs.main.workspace)
    }
  }
}
</script>
