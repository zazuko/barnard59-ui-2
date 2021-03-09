<template>
  <div id="app">
    <blockly-component
      v-if="options.toolbox"
      id="blockly-workspace"
      :options="options"
      ref="main" />
    <div id="code">
      <button @click="showCode()">Blocks → Turtle</button>
      <button @click="toXML()">Blocks → XML</button>
      <button @click="fromXML()" v-show="codeType === 'xml'">XML → Blocks</button>
      <button @click="parseTurtle()" v-show="codeType === 'ttl'">Turtle → Blocks</button>
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

const initialXML = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable type="p:Variable" id="cqOvQEKG$PtcEH,6--T}">url</variable>
    <variable type="p:Variable" id="aV*QED{Isj6,*xt.cY~l">context</variable>
  </variables>
  <block type="variables_set_dynamic" id="I4]ysTdyG6AZ0]uv^FI)" x="10" y="10">
    <field name="VAR" id="cqOvQEKG$PtcEH,6--T}" variabletype="p:Variable">url</field>
    <field name="VALUE">http://worldtimeapi.org/api/timezone/etc/UTC</field>
    <data>b42</data>
    <next>
      <block type="variables_set_dynamic" id="vyH?-/_[b%0Zy)XQvHU!">
        <field name="VAR" id="aV*QED{Isj6,*xt.cY~l" variabletype="p:Variable">context</field>
        <field name="VALUE">{"date":"http://purl.org/dc/elements/1.1/date"}</field>
        <data>http://example.org/pipeline/dateContext</data>
      </block>
    </next>
  </block>
  <block type="p:Pipeline" id="G+r1P}-Yuk}7G+E{qpt(" x="12" y="212">
    <field name="NAME">http://example.org/pipeline/utc</field>
    <value name="VARIABLES">
      <block type="plists_create_with" id="s}8[L$_jYKK?%NL!=vN0">
        <mutation items="3"></mutation>
        <value name="ADD0">
          <block type="variables_get_dynamic" id="@s@$Z7CN1%3]W=^qi5W:">
            <field name="VAR" id="cqOvQEKG$PtcEH,6--T}" variabletype="p:Variable">url</field>
          </block>
        </value>
        <value name="ADD1">
          <block type="variables_get_dynamic" id=".@$]=Xyk]+Tw6xqLfNw!">
            <field name="VAR" id="aV*QED{Isj6,*xt.cY~l" variabletype="p:Variable">context</field>
          </block>
        </value>
      </block>
    </value>
    <statement name="STEPLIST">
      <block type="node:barnard59-base#fetch.json" id="8c(GOV~4a64Q[p*do(BB">
        <field name="NAME">http://example.org/pipeline/fetch</field>
        <value name="ARGUMENTS">
          <block type="plists_create_with" id="J$Cgv7IfbZ9@GH,t};[=">
            <mutation items="2"></mutation>
            <value name="ADD0">
              <block type="variables_get_dynamic" id=";$j9Y2Ab-(KV$b+=Sg;H">
                <field name="VAR" id="cqOvQEKG$PtcEH,6--T}" variabletype="p:Variable">url</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <block type="node:barnard59-base#map" id=".r,bLmVxIuconnhY1][k">
            <field name="NAME">http://example.org/pipeline/jsonldStructure</field>
            <value name="ARGUMENTS">
              <block type="plists_create_with" id="0vaX$4/][m]%^[37/k}x">
                <mutation items="2"></mutation>
                <value name="ADD0">
                  <block type="code:EcmaScript" id="Uhp;6{xm]YV5cpsYWb9n">
                    <field name="ECMASCRIPTCODE">json =&gt; { return { '@context': JSON.parse(this.variables.get('context')), '@id': this.variables.get('url'), date: json.datetime } }</field>
                  </block>
                </value>
              </block>
            </value>
            <next>
              <block type="node:barnard59-formats/jsonld.js#parse.object" id="_-j!x=~47,.irA|t1dJ:">
                <field name="NAME">http://example.org/pipeline/parse</field>
                <next>
                  <block type="node:barnard59-formats/ntriples.js#serialize" id="3)N*!WmEx+K2L{ObU?3P">
                    <field name="NAME">http://example.org/pipeline/serialize</field>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>
`

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
      this.fromXML(initialXML)
    }, 400)
  },
  data () {
    return {
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
        return false
      }
    },
    async parseTurtle () {
      const xml = await parseTurtle(this.code)
      const strXML = xml.end({ prettyPrint: true })
      // console.log(strXML.replace(/ id="[^"]*"/g, ''))

      const dom = Blockly.Xml.textToDom(strXML)
      Blockly.mainWorkspace.clear()
      Blockly.Xml.domToWorkspace(dom, this.$refs.main.workspace)
    }
  }
}
</script>
