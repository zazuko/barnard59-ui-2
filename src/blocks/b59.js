import * as Blockly from 'blockly/core'

Blockly.Blocks['p:Pipeline'] = {
  init () {
    this.appendDummyInput()
      .appendField('Pipeline')
      .appendField(new Blockly.FieldTextInput('Name'), 'NAME')
    this.appendDummyInput()
    this.appendValueInput('VARIABLES')
      .setCheck(['variables_list'])
      .appendField('variables')
    this.appendStatementInput('STEPLIST')
      .setCheck(['p:Step'])
      .appendField('steps')
    this.setColour(230)
    this.setTooltip('hey')
    this.setHelpUrl('https://example.com')
    this.setPreviousStatement(true, ['p:Pipeline'])
    this.setNextStatement(true, ['p:Pipeline'])
  }
}

Blockly.Blocks['p:Step'] = {
  init () {
    // easy to extract from manifest.ttls
    const operations = [
      'barnard59-formats#csvw.parse',
      'barnard59-formats#jsonld.parse',
      'barnard59-formats#jsonld.parse.object',
      'barnard59-formats#jsonld.serialize',
      'barnard59-formats#n3.parse',
      'barnard59-formats#ntriples.serialize',
      'barnard59-formats#rdfxml.parse',
      'barnard59-shell#after',
      'barnard59-shell#before',
      'barnard59-shell#shell',
      'barnard59-base#combine',
      'barnard59-base#concat',
      'barnard59-base#concat.object',
      'barnard59-base#filter',
      'barnard59-base#flatten',
      'barnard59-base#glob',
      'barnard59-base#json.parse',
      'barnard59-base#json.stringify',
      'barnard59-base#limit',
      'barnard59-base#map',
      'barnard59-base#nul',
      'barnard59-base#offset',
      'barnard59-base#stdout',
      'barnard59-base#toString'
    ]
    const operationDropdown = operations.map((operation) => {
      const [lib, fn] = operation.split('#')
      return [`${fn} (${lib})`, operation]
    })
    this.appendDummyInput()
      .appendField('Step')
      .appendField(new Blockly.FieldTextInput('Name'), 'NAME')
    this.appendDummyInput()
      .appendField('Operation')
      .appendField(new Blockly.FieldDropdown(operationDropdown), 'OPERATION')
    this.appendValueInput('ARGUMENTS')
      .appendField('Arguments')
      .setCheck(['p:VariableName', 'code:EcmaScript'])

    this.setColour(5)
    this.setPreviousStatement(true, ['p:Step'])
    this.setNextStatement(true, ['p:Step'])
  }
}

Blockly.Blocks.variables_list = {
  init () {
    this.setStyle('list_blocks')
    this.appendDummyInput()
      .appendField('variables list')
    this.setOutput(true, ['variables_list'])
    this.appendStatementInput('STACK')
      .setCheck(['p:Variable'])
    // this.setPreviousStatement(true, ['p:Variable'])
    this.setNextStatement(true, ['p:Variable'])
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP)
    this.contextMenu = false
  }
}

Blockly.Blocks['p:Variable'] = {
  init () {
    this.setColour(150)
    this.appendDummyInput('Variable')
      .appendField('Variable')
    this.appendDummyInput()
      .appendField('Name')
      .appendField(new Blockly.FieldTextInput('Name'), 'NAME')
    this.appendDummyInput()
      .appendField('Value')
      .appendField(new Blockly.FieldTextInput('Value'), 'VALUE')
    this.setPreviousStatement(true, ['p:Variable'])
    this.setNextStatement(true, ['p:Variable'])
    this.data = 'variable IRI'
  }
}

Blockly.Blocks['p:VariableName'] = {
  init () {
    this.setColour(150)
    this.appendDummyInput()
      .appendField('Variable')
      .appendField(new Blockly.FieldTextInput('Variable Name'), 'VARIABLENAME')
    this.setInputsInline(true)
    this.setOutput(true, ['p:VariableName'])
  }
}

Blockly.Blocks['code:EcmaScript'] = {
  init () {
    this.appendDummyInput()
      .appendField('Code')
      .appendField(new Blockly.FieldTextInput('Code'), 'ECMASCRIPTCODE')
    this.setInputsInline(true)
    this.setOutput(true, ['code:EcmaScript'])
  }
}

// Block for variable getter.
Blockly.Blocks.variables_get_pVariable = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable(
        'VAR_NAME', ['p:Variable'], 'p:Variable'), 'FIELD_NAME')
    this.setOutput(true, 'p:Variable')
  }
}

// Block for variable setter.
Blockly.Blocks.variables_set_pVariable = {
  init: function () {
    this.appendValueInput('NAME')
      .setCheck('p:Variable')
      .appendField('set')
      .appendField(new Blockly.FieldVariable(
        'VAR_NAME', null, ['p:Variable'], 'p:Variable'), 'FIELD_NAME')
      .appendField('to')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
  }
}
