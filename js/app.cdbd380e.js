(function(e){function t(t){for(var a,i,o=t[0],d=t[1],u=t[2],l=0,s=[];l<o.length;l++)i=o[l],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&s.push(r[i][0]),r[i]=0;for(a in d)Object.prototype.hasOwnProperty.call(d,a)&&(e[a]=d[a]);p&&p(t);while(s.length)s.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],a=!0,i=1;i<n.length;i++){var d=n[i];0!==r[d]&&(a=!1)}a&&(c.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},r={app:0},c=[];function i(e){return o.p+"js/"+({}[e]||e)+"."+{"chunk-2d0a2de4":"a550ede7","chunk-2d0a34d7":"1840f73f","chunk-2d0a3ec7":"408b246a","chunk-2d0a4f20":"84751c21","chunk-2d0ab079":"1b8c782e","chunk-2d0ab0ec":"9f3e2b15","chunk-2d0abe66":"87007540","chunk-2d0ac9b1":"3a979747","chunk-2d0b1e51":"0542bf96","chunk-2d0b297a":"359ecb60","chunk-2d0b3114":"34fb21da","chunk-2d0b6189":"2defd936","chunk-2d0b672b":"3e569ebf","chunk-2d0b9801":"da3f69b2","chunk-2d0bd1f9":"b3262dee","chunk-2d0bd794":"bd294345","chunk-2d0bdf7a":"bfbdfd65","chunk-2d0c18e1":"21897e3d","chunk-2d0c1da5":"7a41b8e1","chunk-2d0c73b0":"4e5ac701","chunk-2d0c8254":"d5c5f7a6","chunk-2d0ccf4c":"d7a978c6","chunk-2d0d07c9":"77937772","chunk-2d0d3e22":"98475db2","chunk-2d0d6908":"ed8b969b","chunk-2d0dd0ed":"985b0674","chunk-2d0dd68c":"65448d4a","chunk-2d0de920":"a91adaa2","chunk-2d0df2b6":"aba3b366","chunk-2d0e1bb3":"9770034d","chunk-2d0e525f":"57a3fd61","chunk-2d0e6101":"2586f667","chunk-2d0e885f":"4a40a49b","chunk-2d0e889b":"c2318434","chunk-2d0e8c2e":"17155553","chunk-2d0f026e":"cbe8dd64","chunk-2d0f0c10":"258654b5","chunk-2d0f0de1":"35f13356","chunk-2d20ef76":"9c256b02","chunk-2d20efc7":"e466281a","chunk-2d20f785":"ee2e79cf","chunk-2d210a2f":"fea5d5ca","chunk-2d213de1":"77cb7825","chunk-2d2163c8":"9870e856","chunk-2d2163d4":"746bcbfb","chunk-2d21787e":"a7d10672","chunk-2d217929":"54a9eb2d","chunk-2d217a6d":"a92722c1","chunk-2d21a586":"e17cbde2","chunk-2d21a979":"e23dc808","chunk-2d21ac05":"0a5cc583","chunk-2d21e406":"651a36c9","chunk-2d21eb2d":"90f9a71d","chunk-2d222045":"18ca4000","chunk-2d225a64":"736cad76","chunk-2d2297bb":"36034184","chunk-2d229d99":"667eb177","chunk-2d22c0ff":"dc9676ed","chunk-2d22cc29":"96530133","chunk-2d22daca":"3a3d64c2","chunk-2d230dc8":"830f4e93","chunk-2d230e07":"cd4aee4d","chunk-2d238115":"c4754b6b","chunk-2d238407":"5fc12c23","chunk-7727fe41":"49f2f9bb"}[e]+".js"}function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,a){n=r[e]=[t,a]}));t.push(n[2]=a);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,o.nc&&d.setAttribute("nonce",o.nc),d.src=i(e);var u=new Error;c=function(t){d.onerror=d.onload=null,clearTimeout(l);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+a+": "+c+")",u.name="ChunkLoadError",u.type=a,u.request=c,n[1](u)}r[e]=void 0}};var l=setTimeout((function(){c({type:"timeout",target:d})}),12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(t)},o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],u=d.push.bind(d);d.push=t,d=d.slice();for(var l=0;l<d.length;l++)t(d[l]);var p=u;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},10:function(e,t){},11:function(e,t){},12:function(e,t){},13:function(e,t){},14:function(e,t){},15:function(e,t){},16:function(e,t){},17:function(e,t){},18:function(e,t){},19:function(e,t){},2:function(e,t){},20:function(e,t){},21:function(e,t){},2111:function(e,t,n){var a={"./_index.nq":["8a44","chunk-2d0e885f"],"./as.nq":["80ec","chunk-2d0dd68c"],"./cc.nq":["9ac3","chunk-2d0f026e"],"./cnt.nq":["bd9f","chunk-2d21ac05"],"./csvw.nq":["1c67","chunk-2d0b6189"],"./dash.nq":["e4fe","chunk-2d225a64"],"./dbo.nq":["b485","chunk-2d20f785"],"./dc11.nq":["d587","chunk-2d21e406"],"./dcat.nq":["0232","chunk-2d0a34d7"],"./dcterms.nq":["92f6","chunk-2d0e525f"],"./doap.nq":["2294","chunk-2d0b1e51"],"./dqv.nq":["ff1b","chunk-2d238407"],"./dtype.nq":["f901","chunk-2d22daca"],"./duv.nq":["e2ccd","chunk-7727fe41"],"./earl.nq":["b22b","chunk-2d20ef76"],"./foaf.nq":["143f","chunk-2d0ab0ec"],"./frbr.nq":["2df8","chunk-2d0bdf7a"],"./geo.nq":["72a8","chunk-2d0d6908"],"./geof.nq":["0934","chunk-2d0a4f20"],"./geor.nq":["1411","chunk-2d0ab079"],"./gn.nq":["67d6","chunk-2d0d07c9"],"./gr.nq":["85e2","chunk-2d0de920"],"./grddl.nq":["2bc1","chunk-2d0bd794"],"./gtfs.nq":["8087","chunk-2d0dd0ed"],"./http.nq":["b979","chunk-2d210a2f"],"./hydra.nq":["c6ff","chunk-2d217929"],"./ical.nq":["dece","chunk-2d229d99"],"./ldp.nq":["19f9","chunk-2d0ac9b1"],"./lvont.nq":["4fae","chunk-2d0ccf4c"],"./ma.nq":["488c","chunk-2d0c1da5"],"./oa.nq":["bab3","chunk-2d21a586"],"./og.nq":["8987","chunk-2d0df2b6"],"./org.nq":["9dcc","chunk-2d0f0de1"],"./owl.nq":["de48","chunk-2d2297bb"],"./prov.nq":["c6b7","chunk-2d21787e"],"./qb.nq":["006d","chunk-2d0a2de4"],"./qudt.nq":["5443","chunk-2d0c8254"],"./qudtv.nq":["cd8f","chunk-2d222045"],"./rdau.nq":["d759","chunk-2d21eb2d"],"./rdf.nq":["c846","chunk-2d217a6d"],"./rdfa.nq":["7c4e","chunk-2d0e1bb3"],"./rdfs.nq":["b267","chunk-2d20efc7"],"./rr.nq":["96c1","chunk-2d0e6101"],"./rss.nq":["af06","chunk-2d213de1"],"./schema.nq":["8b3a","chunk-2d0e8c2e"],"./sd.nq":["eda4","chunk-2d230dc8"],"./sdmx.nq":["c236","chunk-2d2163c8"],"./sem.nq":["fe99","chunk-2d238115"],"./sh.nq":["2792","chunk-2d0b3114"],"./sioc.nq":["4719","chunk-2d0c18e1"],"./skos.nq":["9e5c","chunk-2d0f0c10"],"./skosxl.nq":["16f1","chunk-2d0abe66"],"./sosa.nq":["2b3f","chunk-2d0bd1f9"],"./ssn.nq":["5f50","chunk-2d0d3e22"],"./test.nq":["f241","chunk-2d22c0ff"],"./time.nq":["c22a","chunk-2d2163d4"],"./vaem.nq":["1ccf","chunk-2d0b672b"],"./vann.nq":["f537","chunk-2d22cc29"],"./vcard.nq":["5076","chunk-2d0c73b0"],"./void.nq":["2589","chunk-2d0b297a"],"./vs.nq":["32e1","chunk-2d0b9801"],"./wgs.nq":["edc5","chunk-2d230e07"],"./xhv.nq":["03f4","chunk-2d0a3ec7"],"./xkos.nq":["bbbe","chunk-2d21a979"],"./xsd.nq":["8a62","chunk-2d0e889b"]};function r(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],r=t[0];return n.e(t[1]).then((function(){return n.t(r,1)}))}r.keys=function(){return Object.keys(a)},r.id="2111",e.exports=r},22:function(e,t){},23:function(e,t){},24:function(e,t){},3:function(e,t){},"38c8":function(e,t,n){},4:function(e,t){},5:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e.options.toolbox?n("blockly-component",{ref:"main",attrs:{id:"blockly-workspace",options:e.options}}):e._e(),n("div",{attrs:{id:"code"}},[n("button",{on:{click:function(t){return e.showCode()}}},[e._v("Blocks → Turtle")]),n("button",{on:{click:function(t){return e.toXML()}}},[e._v("Blocks → XML")]),n("button",{directives:[{name:"show",rawName:"v-show",value:"xml"===e.codeType,expression:"codeType === 'xml'"}],on:{click:function(t){return e.fromXML()}}},[e._v("XML → Blocks")]),n("button",{directives:[{name:"show",rawName:"v-show",value:"ttl"===e.codeType,expression:"codeType === 'ttl'"}],on:{click:function(t){return e.parseTurtle()}}},[e._v("Turtle → Blocks")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}})])],1)},c=[],i=(n("99af"),n("96cf"),n("1da1")),o=(n("38c8"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{ref:"workspace-container",staticClass:"workspace-container"}),n("xml",{ref:"workspace-toolbox",staticStyle:{display:"none"}},[e._t("default")],2)],1)}),d=[],u=n("54ca"),l=n.n(u),p={name:"BlocklyComponent",props:["options"],data:function(){return{workspace:null}},mounted:function(){var e=this.$props.options||{};e.toolbox||(e.toolbox=this.$refs["workspace-toolbox"]),this.workspace=l.a.inject(this.$refs["workspace-container"],e)}},s=p,f=n("2877"),h=Object(f["a"])(s,o,d,!1,null,null,null),b=h.exports,m=(n("caad"),n("2532"),n("b7fd"));m["ConnectionChecker"].prototype.doTypeChecks=function(e,t){if(!e.isSuperior()){var n=[e,t];t=n[0],e=n[1]}var a=e.getCheck(),r=t.getCheck();if(!a||!r)return!0;for(var c=0;c<a.length;c++)if(r.includes(a[c]))return!0;if(!e.sourceBlock_._dynamicBlock)return!1;if(!t.sourceBlock_._dynamicBlock)return!1;var i=e.sourceBlock_._pipeTypes,o=t.sourceBlock_._pipeTypes;return!!(i.includes("p:Readable")&&o.includes("p:Writable")||i.includes("p:ReadableObjectMode")&&o.includes("p:WritableObjectMode"))},m["Blocks"]["p:Pipeline"]={init:function(){this.appendDummyInput().appendField("Pipeline").appendField(new m["FieldTextInput"]("Name"),"NAME"),this.appendDummyInput(),this.appendValueInput("VARIABLES").setCheck(["Array"]).appendField("variables"),this.appendStatementInput("STEPLIST").appendField("steps"),this.setColour(230),this.setTooltip("hey"),this.setHelpUrl("https://example.com"),this.setPreviousStatement(!0,["p:Pipeline"]),this.setNextStatement(!0,["p:Pipeline"])}},m["Blocks"]["code:EcmaScript"]={init:function(){this.appendDummyInput().appendField("Code").appendField(new m["FieldTextInput"]("Code"),"ECMASCRIPTCODE"),this.setInputsInline(!0),this.setOutput(!0,["code:EcmaScript"])}},m["Blocks"]["code:EcmaScriptTemplateLiteral"]={init:function(){this.appendDummyInput().appendField("Template Literal").appendField(new m["FieldTextInput"]("Code"),"ECMASCRIPTCODE"),this.setInputsInline(!0),this.setOutput(!0,["code:EcmaScriptTemplateLiteral"])}},m["Blocks"].variables_get_dynamic={init:function(){this.setColour(150),this.appendDummyInput().appendField(new m["FieldVariable"]("VAR_NAME",null,["p:Variable"],"p:Variable"),"VAR"),this.setOutput(!0,["p:Variable"])}},m["Blocks"].variables_set_dynamic={init:function(){this.setColour(150),this.appendDummyInput("Variable").appendField("Variable"),this.appendDummyInput().appendField("Name").appendField(new m["FieldVariable"]("VAR_NAME",null,["p:Variable"],"p:Variable"),"VAR"),this.appendDummyInput().appendField("Value").appendField(new m["FieldTextInput"]("Value"),"VALUE"),this.setPreviousStatement(!0,["p:Variable"]),this.setNextStatement(!0,["p:Variable"]),this.data="variable IRI"}},m["Blocks"].plists_create_with={init:function(){this.setHelpUrl(m["Msg"].LISTS_CREATE_WITH_HELPURL),this.setStyle("list_blocks"),this.itemCount_=1,this.updateShape_(),this.setOutput(!0,"Array"),this.setMutator(new m["Mutator"](["lists_create_with_item"])),this.setTooltip(m["Msg"].LISTS_CREATE_WITH_TOOLTIP)},mutationToDom:function(){var e=m["utils"].xml.createElement("mutation");return e.setAttribute("items",this.itemCount_),e},domToMutation:function(e){this.itemCount_=parseInt(e.getAttribute("items"),10),this.updateShape_()},decompose:function(e){var t=e.newBlock("lists_create_with_container");t.initSvg();for(var n=t.getInput("STACK").connection,a=0;a<this.itemCount_;a++){var r=e.newBlock("lists_create_with_item");r.initSvg(),n.connect(r.previousConnection),n=r.nextConnection}return t},compose:function(e){var t=e.getInputTargetBlock("STACK"),n=[];while(t&&!t.isInsertionMarker())n.push(t.valueConnection_),t=t.nextConnection&&t.nextConnection.targetBlock();for(var a=0;a<this.itemCount_;a++){var r=this.getInput("ADD"+a).connection.targetConnection;r&&!n.includes(r)&&r.disconnect()}this.itemCount_=n.length,this.updateShape_();for(var c=0;c<this.itemCount_;c++)m["Mutator"].reconnect(n[c],this,"ADD"+c)},saveConnections:function(e){var t=e.getInputTargetBlock("STACK"),n=0;while(t){var a=this.getInput("ADD"+n);t.valueConnection_=a&&a.connection.targetConnection,n++,t=t.nextConnection&&t.nextConnection.targetBlock()}},updateShape_:function(){this.itemCount_&&this.getInput("EMPTY")?this.removeInput("EMPTY"):this.itemCount_||this.getInput("EMPTY")||this.appendDummyInput("EMPTY").appendField(m["Msg"].LISTS_CREATE_EMPTY_TITLE);for(var e=0;e<this.itemCount_;e++)if(!this.getInput("ADD"+e)){var t=this.appendValueInput("ADD"+e).setAlign(m["ALIGN_RIGHT"]);0===e&&t.appendField(m["Msg"].LISTS_CREATE_WITH_INPUT_WITH)}},onchange:function(){this.allInputsFilled()&&(this.itemCount_++,this.updateShape_())}};var k=n("d4ec"),v=n("bee2"),y=n("262e"),_=n("2caf");function g(e){var t=Object.assign({width:4.5,height:10,peak:7},e),n=t.width,a=t.height,r=t.peak;return{type:2,width:2*n+r,height:a,pathLeft:" l ".concat(n,",").concat(a,"  ").concat(r,",0  ").concat(n,",-").concat(a," "),pathRight:" l -".concat(n,",").concat(a,"  -").concat(r,",0  -").concat(n,",-").concat(a," ")}}var E={NONE:g({width:4.5,height:0,peak:7}),NORMAL:g({width:5.5,height:10,peak:2}),OBJECT:g({width:0,height:10,peak:15})},T={LIST:O({width:10,height:20,peak:10}),NORMAL:O({width:8,height:15,peak:10})};function O(e){var t=Object.assign({width:8,height:15,peak:10},e),n=t.width,a=t.height,r=t.peak,c=a/2;return{type:1,width:n,height:a,pathDown:" c 0,".concat(r,"  -").concat(n,",-").concat(n,"  -").concat(n,",").concat(c,"  s ").concat(n,",-").concat(r-c,"  ").concat(n,",").concat(c," "),pathUp:" c 0,-".concat(r,"  -").concat(n,",").concat(n,"  -").concat(n,",-").concat(c,"  s ").concat(n,",").concat(r-c,"  ").concat(n,",-").concat(c," ")}}function w(e){if(A(e))return T.LIST;switch(e.type){case"p:Pipeline":return T.LIST;default:return T.NORMAL}}function x(e){if(A(e))return T.LIST;switch(e.type){case"p:Pipeline":case"plists_create_with":return T.LIST;default:return T.NORMAL}}function B(e){return"p:Pipeline"===e.type?E.NONE:e._pipeTypes.includes("p:Writable")?E.NORMAL:e._pipeTypes.includes("p:WritableObjectMode")?E.OBJECT:E.NONE}function S(e){return"p:Pipeline"===e.type?E.NONE:e._pipeTypes.includes("p:Readable")?E.NORMAL:e._pipeTypes.includes("p:ReadableObjectMode")?E.OBJECT:E.NONE}function A(e){return!(null===e||void 0===e||!e._dynamicBlock)}var C=function(e){Object(y["a"])(n,e);var t=Object(_["a"])(n);function n(){return Object(k["a"])(this,n),t.apply(this,arguments)}return Object(v["a"])(n,[{key:"shapeFor",value:function(e){var t,n,a,r="p:Pipeline"===e.sourceBlock_.type,c="node:generic"===e.sourceBlock_.type,i=A(e.sourceBlock_),o=!e.check_&&(null===(t=e.sourceBlock_)||void 0===t||null===(n=t.nextConnection)||void 0===n||null===(a=n.check_)||void 0===a?void 0:a.includes("p:Pipeline"));if(o)return E.NONE;switch(e.type){case m["INPUT_VALUE"]:return w(e.sourceBlock_);case m["OUTPUT_VALUE"]:return x(e.sourceBlock_);case m["PREVIOUS_STATEMENT"]:if(e.sourceBlock_){var d;if(i)return c&&null!==(d=e.targetConnection)&&void 0!==d&&d.sourceBlock_?S(e.targetConnection.sourceBlock_):B(e.sourceBlock_);if(r){var u,l=null===(u=e.sourceBlock_)||void 0===u?void 0:u.childBlocks_,p=l[0];return l&&A(p)?B(p):E.NONE}}return this.NOTCH;case m["NEXT_STATEMENT"]:if(e.sourceBlock_){var s;if(i)return c&&null!==(s=e.targetConnection)&&void 0!==s&&s.sourceBlock_?B(e.targetConnection.sourceBlock_):S(e.sourceBlock_);if(r){var f=e.sourceBlock_.getDescendants(!0),h=f[f.length-1],b=A(h)?h:null;return b?S(b):E.NONE}}return this.NOTCH;default:throw Error("Unknown type")}}}]),n}(m["blockRendering"].ConstantProvider),R=function(e){Object(y["a"])(n,e);var t=Object(_["a"])(n);function n(){return Object(k["a"])(this,n),t.apply(this,arguments)}return Object(v["a"])(n,[{key:"makeConstants_",value:function(){return new C}}]),n}(m["blockRendering"].Renderer);m["blockRendering"].register("custom_renderer",R);n("7db0"),n("4160"),n("13d5"),n("b0c0"),n("4fad"),n("d3b7"),n("ac1f"),n("25f0"),n("5319"),n("159b");var N,I=n("8785"),V=n("3835"),q=n("fc18"),M=n.n(q),D=n("2d0c"),j=n.n(D),P=n("d4f0"),L=n.n(P),F=n("310e"),U=n("99b6"),W={schema:"http://schema.org/",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",p:"https://pipeline.described.at/",code:"https://code.described.at/"},$=Object.entries(W).reduce((function(e,t){var n=Object(V["a"])(t,2),a=n[0],r=n[1];return e[a]=L()(r),e}),{});Object.entries(W).forEach((function(e){var t=Object(V["a"])(e,2),n=t[0],a=t[1];U["a"][n]=a}));var H=m["B59"]=new m["Generator"]("B59");m["B59"].ORDER_ATOMIC=0,m["B59"].ORDER_FIRST_PASS=10,m["B59"].ORDER_SECOND_PASS=20,m["B59"].ORDER_NONE=99,m["B59"].RESERVED_WORDS_="",m["B59"].init=function(e){m["B59"].cf=M()({dataset:j()()}),m["B59"].variableDB_?m["B59"].variableDB_.reset():m["B59"].variableDB_=new m["Names"](m["B59"].RESERVED_WORDS_),m["B59"].variableDB_.setVariableMap(e.getVariableMap()),m["B59"].defvars_=m["Variables"].allUsedVarModels(e)},m["B59"].finish=function(e){return Object(F["a"])(N||(N=Object(I["a"])(["",""])),m["B59"].cf.dataset).toString().replace(/ rdf:type /g," a ")},m["B59"]["p:Pipeline"]=function(e){var t=e.getFieldValue("NAME"),n=m["B59"].cf.blankNode("variables");return m["B59"].cf.namedNode(t).addOut($.rdf.type,$.p.Pipeline).addOut($.rdf.type,$.p.Readable).addOut($.p.variables,n).addOut($.p.steps,m["B59"].cf.namedNode("".concat(t,"/steps"))),m["B59"].statementToCode(e,"VARIABLES"),m["B59"].statementToCode(e,"STEPLIST"),""},m["B59"].plists_create_with=function(e){for(var t=0;t<e.itemCount_;t++)m["B59"].valueToCode(e,"ADD"+t,m["B59"].ORDER_NONE);return""},m["B59"].variables_get_dynamic=function(e){return""},m["B59"].variables_set_dynamic=function(e){var t=e.getFieldValue("VAR");if(/b[0-9]+/.test(e.data)){var n=m["B59"].variableDB_.variableMap_.variableMap_["p:Variable"].find((function(e){var n=e.id_;return n===t}));n.data=e.data,n.value=e.getFieldValue("VALUE");var a=m["B59"].cf.blankNode().addOut($.rdf.type,$.p.Variable).addOut($.p.name,n.name).addOut($.p.value,n.value);m["B59"].cf.blankNode("variables").addOut($.p.variable,a)}else if("@base"!==e.data){m["B59"].cf.blankNode("variables").addOut($.p.variable,m["B59"].cf.namedNode(e.data));var r=m["B59"].defvars_.find((function(e){var n=e.id_;return n===t}));m["B59"].cf.namedNode(e.data).addOut($.rdf.type,$.p.Variable).addOut($.p.name,r.name).addOut($.p.value,e.getFieldValue("VALUE"))}var c=e.nextConnection&&e.nextConnection.targetBlock();return m["B59"].blockToCode(c),""},m["B59"]["code:EcmaScript"]=function(e){var t=e.getFieldValue("ECMASCRIPTCODE");return[t,m["B59"].ORDER_NONE]};var Y=n("6178"),G=(n("a15b"),n("d81d"),n("fb6a"),n("3ca3"),n("1276"),n("9911"),n("ddb0"),n("4de4"),n("a630"),n("6062"),n("466d"),n("3f04")),X=n.n(G),K=n("6b44"),J=n.n(K),Q=n("2fc7"),z=n.n(Q),Z=n("d339"),ee=n.n(Z),te=n("b25c"),ne=X.a.parsers.get("text/turtle"),ae={schema:L()("http://schema.org/"),rdf:L()("http://www.w3.org/1999/02/22-rdf-syntax-ns#"),p:L()("https://pipeline.described.at/"),code:L()("https://code.described.at/")};function re(e){return ce.apply(this,arguments)}function ce(){return ce=Object(i["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t.match(/^\s*@base\s+<([^>]+)>\s*\./im),!n){e.next=3;break}return e.abrupt("return",n[1]);case 3:return e.abrupt("return","");case 4:case"end":return e.stop()}}),e)}))),ce.apply(this,arguments)}function ie(e){return oe.apply(this,arguments)}function oe(){return oe=Object(i["a"])(regeneratorRuntime.mark((function e(t){var n,a,r,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=ee()(t),a=ne.import(n),e.t0=M.a,e.next=5,J.a.dataset().import(a);case 5:return e.t1=e.sent,e.t2={dataset:e.t1},r=(0,e.t0)(e.t2),e.next=10,re(t);case 10:if(c=e.sent,c){e.next=13;break}return e.abrupt("return",r);case 13:return r.namedNode(ae.p.parsedPipeline).addOut(ae.p.hasBase,c),e.abrupt("return",r);case 15:case"end":return e.stop()}}),e)}))),oe.apply(this,arguments)}function de(e){return ue.apply(this,arguments)}function ue(){return ue=Object(i["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,ie(t);case 2:return n=e.sent,e.abrupt("return",he(n));case 4:case"end":return e.stop()}}),e)}))),ue.apply(this,arguments)}function le(e){return pe.apply(this,arguments)}function pe(){return pe=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){return z()(t,{formats:X.a}).then((function(t){return e(t.quadStream())})).catch((function(e){return n(e)}))})));case 1:case"end":return e.stop()}}),e)}))),pe.apply(this,arguments)}function se(e){return fe.apply(this,arguments)}function fe(){return fe=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=M.a,e.t1=J.a.dataset(),e.next=4,le(t);case 4:return e.t2=e.sent,e.next=7,e.t1.import.call(e.t1,e.t2);case 7:return e.t3=e.sent,e.t4={dataset:e.t3},e.abrupt("return",(0,e.t0)(e.t4));case 10:case"end":return e.stop()}}),e)}))),fe.apply(this,arguments)}function he(e){var t=e.has(ae.p.hasBase),n=t.term?t.out().value:"",a=Object(te["create"])().ele("https://developers.google.com/blockly/xml","xml"),r=a.ele("variables"),c=a,i=new Set;return e.has(ae.rdf.type,ae.p.Pipeline).forEach((function(e){var t=a.ele("block",{type:"p:Pipeline"}).ele("field",{name:"NAME"}).txt(e.value).up(),o=e.out(ae.p.variables).out().filter((function(e){return e.has(ae.rdf.type,ae.p.Variable)})).map((function(e){return{iri:e.term.value,name:e.out(ae.p.name).value,value:e.out(ae.p.value).value}}));n&&o.push({iri:"@base",name:"@base",value:n});var d=t.ele("value",{name:"VARIABLES"}).ele("block",{type:"plists_create_with"}).ele("mutation",{items:"".concat(o.length)}).up();o.forEach((function(e,t){i.has(e.name)||(i.add(e.name),r.ele("variable",{type:"p:Variable"}).txt(e.name),c=c.ele("block",{type:"variables_set_dynamic"}).ele("field",{name:"VAR",variableType:"p:Variable"}).txt(e.name).up().ele("field",{name:"VALUE"}).txt(e.value).up().ele("data").txt(e.iri).up().ele("next"),"@base"!==e.name&&d.ele("value",{name:"ADD".concat(t)}).ele("block",{type:"variables_get_dynamic"}).ele("field",{name:"VAR",variabletype:"p:Variable"}).txt(e.name))}));var u=Array.from(e.out(ae.p.steps).out(ae.p.stepList).list()),p=t.ele("statement",{name:"STEPLIST"});u.forEach((function(e,t,n){var a=n.length,r=e.out(ae.code.implementedBy),c=r.out(ae.code.link),i=Array.from(e.out(ae.code.arguments).toArray()),o=c.term.value,d=!l.a.Blocks[o],u=e.term.value;d&&(o="node:generic"),p=p.ele("block",{type:o}).ele("field",{name:"NAME"}).txt(u).up(),d&&(p=p.ele("field",{name:"OPERATION"}).txt(c.term.value).up());var s=i.map((function(e){var t,n;if("BlankNode"===(null===(t=e)||void 0===t||null===(n=t.term)||void 0===n?void 0:n.termType)){var a=Object(V["a"])(e.out().terms,1);e=a[0]}e=e.term||e;var r=e.datatype;if(r){if(r.equals(ae.p.VariableName)){var c={type:"variables_get_dynamic"},i={name:"VAR",variabletype:"p:Variable"},o=e.value;return{block:c,field:i,val:o}}if(r.equals(ae.code.EcmaScript)){var d={type:"code:EcmaScript"},u={name:"ECMASCRIPTCODE"},l=e.value;return{block:d,field:u,val:l}}if(r.equals(ae.code.EcmaScriptTemplateLiteral)){var p={type:"code:EcmaScriptTemplateLiteral"},s={name:"ECMASCRIPTCODE"},f=e.value;return{block:p,field:s,val:f}}}})).filter(Boolean);if(s.length){var f=p.ele("value",{name:"ARGUMENTS"}).ele("block",{type:"plists_create_with"}).ele("mutation",{items:"".concat(s.length)}).up();s.forEach((function(e,t){var n=e.block,a=e.field,r=e.val;f.ele("value",{name:"ADD".concat(t)}).ele("block",n).ele("field",a).txt(r)}))}t<a-1&&(p=p.ele("next"))}))})),a}var be=["manifest-generic.ttl","manifest-barnard59-base.ttl","manifest-barnard59-core.ttl","manifest-barnard59-csvw.ttl","manifest-barnard59-formats.ttl","manifest-barnard59-ftp.ttl","manifest-barnard59-graph-store.ttl","manifest-barnard59-http.ttl","manifest-barnard59-rdf.ttl","manifest-barnard59-shell.ttl","manifest-barnard59-sparql.ttl"],me={schema:L()("http://schema.org/"),rdf:L()("http://www.w3.org/1999/02/22-rdf-syntax-ns#"),rdfs:L()("http://www.w3.org/2000/01/rdf-schema#"),p:L()("https://pipeline.described.at/"),code:L()("https://code.described.at/")};function ke(){return ve.apply(this,arguments)}function ve(){return ve=Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(be.map((function(e){return se("./manifests/".concat(e))})));case 2:return t=e.sent,t=t.map((function(e,t){var n=be[t].split("-").slice(1).join("-").split(".")[0];return[n,e]})),e.abrupt("return",t.map((function(e,t){var n=Object(V["a"])(e,2),a=n[0],r=n[1];return r.has(me.rdf.type,me.p.Operation).map((function(e){var n=e.out(me.rdfs.label).term.value,r=e.out(me.code.implementedBy),c=r.out(me.code.link),i=c.term.value;return m["Blocks"][i]={init:function(){this._dynamicBlock=!0,this._pipeTypes=["p:Step"],"node:generic"===i?(this.appendDummyInput().appendField("".concat(n)),this.appendDummyInput().appendField("Operation").appendField(new m["FieldTextInput"]("Operation"),"OPERATION")):this.appendDummyInput().appendField("".concat(n," (").concat(a,")")),this.appendDummyInput().appendField("Step").appendField(new m["FieldTextInput"]("Name"),"NAME"),this.appendValueInput("ARGUMENTS").appendField("Arguments").setCheck(["p:Variable","code:EcmaScript","code:EcmaScriptTemplateLiteral","Array"]),this.setColour((185+30*t)%360),this.setTooltip(e.out(me.rdfs.comment).term.value),this.setHelpUrl(e.term.value);var r=e.has(me.rdf.type,me.p.Readable).values.length,c=e.has(me.rdf.type,me.p.Writable).values.length,o=e.has(me.rdf.type,me.p.ReadableObjectMode).values.length,d=e.has(me.rdf.type,me.p.WritableObjectMode).values.length,u=["p:Pipeline"];c&&(u.push("p:Readable"),this._pipeTypes.push("p:Writable")),d&&(u.push("p:ReadableObjectMode"),this._pipeTypes.push("p:WritableObjectMode")),this.setPreviousStatement(!0,u);var l=[];r&&(l.push("p:Writable"),this._pipeTypes.push("p:Readable")),o&&(l.push("p:WritableObjectMode"),this._pipeTypes.push("p:ReadableObjectMode")),l.length&&this.setNextStatement(!0,l)}},m["B59"][i]=ye(i),'\n          <block type="'.concat(i,'">\n            <field name="NAME"></field>\n          </block>\n        ')})).join("\n")})).join("\n"));case 5:case"end":return e.stop()}}),e)}))),ve.apply(this,arguments)}var ye=function(e){return function(t){var n=t.getFieldValue("NAME"),a=m["B59"].cf.blankNode().addOut(me.code.link,m["B59"].cf.namedNode(e)).addOut(me.rdf.type,me.code.EcmaScript),r=m["B59"].cf.namedNode(n).addOut(me.rdf.type,me.p.Step).addOut(me.code.implementedBy,a);m["B59"].valueToCode(t,"ARGUMENTS",m["B59"].ORDER_NONE)&&r.addList(me.code.arguments,[m["B59"].cf.literal(m["B59"].valueToCode(t,"ARGUMENTS",m["B59"].ORDER_NONE))]);var c=t.nextConnection&&t.nextConnection.targetBlock();return m["B59"].blockToCode(c),""}},_e=function(e){var t=[],n=document.createElement("button");n.setAttribute("text","Create Typed Variable"),n.setAttribute("callbackKey","callbackName"),t.push(n);var a=l.a.VariablesDynamic.flyoutCategoryBlocks(e);return t=t.concat(a),t},ge='\n<xml xmlns="https://developers.google.com/blockly/xml">\n  <variables>\n    <variable type="p:Variable" id="cqOvQEKG$PtcEH,6--T}">url</variable>\n    <variable type="p:Variable" id="aV*QED{Isj6,*xt.cY~l">context</variable>\n  </variables>\n  <block type="variables_set_dynamic" id="I4]ysTdyG6AZ0]uv^FI)" x="10" y="10">\n    <field name="VAR" id="cqOvQEKG$PtcEH,6--T}" variabletype="p:Variable">url</field>\n    <field name="VALUE">http://worldtimeapi.org/api/timezone/etc/UTC</field>\n    <data>b42</data>\n    <next>\n      <block type="variables_set_dynamic" id="vyH?-/_[b%0Zy)XQvHU!">\n        <field name="VAR" id="aV*QED{Isj6,*xt.cY~l" variabletype="p:Variable">context</field>\n        <field name="VALUE">{"date":"http://purl.org/dc/elements/1.1/date"}</field>\n        <data>http://example.org/pipeline/dateContext</data>\n      </block>\n    </next>\n  </block>\n  <block type="p:Pipeline" id="G+r1P}-Yuk}7G+E{qpt(" x="12" y="212">\n    <field name="NAME">http://example.org/pipeline/utc</field>\n    <value name="VARIABLES">\n      <block type="plists_create_with" id="s}8[L$_jYKK?%NL!=vN0">\n        <mutation items="3"></mutation>\n        <value name="ADD0">\n          <block type="variables_get_dynamic" id="@s@$Z7CN1%3]W=^qi5W:">\n            <field name="VAR" id="cqOvQEKG$PtcEH,6--T}" variabletype="p:Variable">url</field>\n          </block>\n        </value>\n        <value name="ADD1">\n          <block type="variables_get_dynamic" id=".@$]=Xyk]+Tw6xqLfNw!">\n            <field name="VAR" id="aV*QED{Isj6,*xt.cY~l" variabletype="p:Variable">context</field>\n          </block>\n        </value>\n      </block>\n    </value>\n    <statement name="STEPLIST">\n      <block type="node:barnard59-base#fetch.json" id="8c(GOV~4a64Q[p*do(BB">\n        <field name="NAME">http://example.org/pipeline/fetch</field>\n        <value name="ARGUMENTS">\n          <block type="plists_create_with" id="J$Cgv7IfbZ9@GH,t};[=">\n            <mutation items="2"></mutation>\n            <value name="ADD0">\n              <block type="variables_get_dynamic" id=";$j9Y2Ab-(KV$b+=Sg;H">\n                <field name="VAR" id="cqOvQEKG$PtcEH,6--T}" variabletype="p:Variable">url</field>\n              </block>\n            </value>\n          </block>\n        </value>\n        <next>\n          <block type="node:barnard59-base#map" id=".r,bLmVxIuconnhY1][k">\n            <field name="NAME">http://example.org/pipeline/jsonldStructure</field>\n            <value name="ARGUMENTS">\n              <block type="plists_create_with" id="0vaX$4/][m]%^[37/k}x">\n                <mutation items="2"></mutation>\n                <value name="ADD0">\n                  <block type="code:EcmaScript" id="Uhp;6{xm]YV5cpsYWb9n">\n                    <field name="ECMASCRIPTCODE">json =&gt; { return { \'@context\': JSON.parse(this.variables.get(\'context\')), \'@id\': this.variables.get(\'url\'), date: json.datetime } }</field>\n                  </block>\n                </value>\n              </block>\n            </value>\n            <next>\n              <block type="node:barnard59-formats/jsonld.js#parse.object" id="_-j!x=~47,.irA|t1dJ:">\n                <field name="NAME">http://example.org/pipeline/parse</field>\n                <next>\n                  <block type="node:barnard59-formats/ntriples.js#serialize" id="3)N*!WmEx+K2L{ObU?3P">\n                    <field name="NAME">http://example.org/pipeline/serialize</field>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>\n',Ee='\n@base <http://example.org/pipeline/> .\n@prefix code: <https://code.described.at/> .\n@prefix p: <https://pipeline.described.at/> .\n@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n\n<utc> a p:Pipeline, p:Readable ;\n  p:variables [\n    p:variable [\n      a p:Variable;\n      p:name "url" ;\n      p:value "http://worldtimeapi.org/api/timezone/etc/UTC" ;\n    ] ,\n    <dateContext>\n  ] ;\n  p:steps <steps> .\n\n<dateContext>\n  a p:Variable;\n  p:name "context" ;\n  p:value """{"date":"http://purl.org/dc/elements/1.1/date"}""" .\n\n<steps>\n  p:stepList ( <fetch> <jsonldStructure> <parse> <serialize> ) .\n\n<fetch> a p:Step ;\n  code:implementedBy [\n    code:link <node:barnard59-base#fetch.json> ;\n    a code:EcmaScript\n  ];\n  code:arguments ("url"^^p:VariableName) .\n\n<jsonldStructure> a p:Step ;\n  code:implementedBy [\n    code:link <node:barnard59-base#map> ;\n    a code:EcmaScript\n  ];\n  code:arguments ("json => { return { \'@context\': JSON.parse(this.variables.get(\'context\')), \'@id\': this.variables.get(\'url\'), date: json.datetime } }"^^code:EcmaScript) .\n\n<parse> a p:Step ;\n  code:implementedBy [\n    code:link <node:barnard59-formats/jsonld.js#parse.object> ;\n    a code:EcmaScript\n  ] .\n\n<serialize> a p:Step ;\n  code:implementedBy [\n    code:link <node:barnard59-formats/ntriples.js#serialize> ;\n    a code:EcmaScript\n  ] .\n',Te=function(e){return'\n<xml>\n  <category name="Pipeline" colour="%{BKY_LOOPS_HUE}">\n    <block type="p:Pipeline">\n      <field name="NAME">my-pipeline</field>\n    </block>\n    <block type="code:EcmaScript">\n      <field name="ECMASCRIPTCODE">(x) => x * 2</field>\n    </block>\n    <block type="code:EcmaScriptTemplateLiteral">\n      <field name="ECMASCRIPTCODE">Date is ${new Date().toISOString()}</field>\n    </block>\n  </category>\n  <category name="Steps" colour="%{BKY_LOOPS_HUE}">\n    '.concat(e,'\n  </category>\n  <category name="Lists">\n    <block type="plists_create_with"></block>\n  </category>\n  <category name="Variables" custom="CREATE_TYPED_VARIABLE" colour="%{BKY_VARIABLES_HUE}"></category>\n</xml>\n')},Oe={name:"app",components:{BlocklyComponent:b},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,ke();case 2:n=t.sent,e.options.toolbox=Te(n),setTimeout((function(){var t=e.$refs.main.workspace;t.registerToolboxCategoryCallback("CREATE_TYPED_VARIABLE",_e);var n=new Y["a"](t,"callbackName",[["p:Variable","p:Variable"],["p:Variable","p:Variable"]]);n.init(),e.fromXML(ge)}),400);case 5:case"end":return t.stop()}}),t)})))()},data:function(){return{code:Ee,codeType:"ttl",options:{media:"media/",grid:{spacing:25,length:3,colour:"#ccc",snap:!0},toolbox:"",renderer:"custom_renderer"}}},methods:{showCode:function(){this.code=H.workspaceToCode(this.$refs.main.workspace),this.codeType="ttl"},toXML:function(){var e=l.a.Xml.workspaceToDom(this.$refs.main.workspace),t=l.a.Xml.domToPrettyText(e);this.code=t,this.codeType="xml"},fromXML:function(e){try{var t=l.a.Xml.textToDom(e||this.code);return l.a.mainWorkspace.clear(),l.a.Xml.domToWorkspace(t,this.$refs.main.workspace),!0}catch(n){return console.error("XML parsing failed"),!1}},parseTurtle:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,de(e.code);case 2:n=t.sent,a=n.end({prettyPrint:!0}),r=l.a.Xml.textToDom(a),l.a.mainWorkspace.clear(),l.a.Xml.domToWorkspace(r,e.$refs.main.workspace);case 7:case"end":return t.stop()}}),t)})))()}}},we=Oe,xe=Object(f["a"])(we,r,c,!1,null,null,null),Be=xe.exports;a["a"].config.productionTip=!1,a["a"].config.ignoredElements=["field","block","category","xml","mutation","value","sep"],new a["a"]({render:function(e){return e(Be)}}).$mount("#app")},6:function(e,t){},7:function(e,t){},8:function(e,t){},9:function(e,t){}});
//# sourceMappingURL=app.cdbd380e.js.map