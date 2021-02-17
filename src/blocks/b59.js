import * as Blockly from 'blockly/core'

Blockly.Blocks['b:pipeline'] = {
  init () {
    this.appendDummyInput()
      .appendField('Pipeline')
      .appendField(new Blockly.FieldTextInput('Name'), 'NAME')
    this.appendDummyInput()
    this.appendStatementInput('VARIABLES')
      .setCheck('p:Variable')
      .appendField('variables')
    this.appendStatementInput('STEPLIST')
      .setCheck('p:Step')
      .appendField('steps')
    // this.setNextStatement(true, 'String')
    this.setColour(230)
    this.setTooltip('buy id')
    this.setHelpUrl('https://example.com')
    this.setPreviousStatement(true, 'p:Pipeline')
    this.setNextStatement(true, 'p:Pipeline')
  }
}

Blockly.Blocks['b:step'] = {
  init () {
    // easy to extract from manifest.ttls
    const operations = [
      'barnard59-formats#csvw/parse',
      'barnard59-formats#jsonld/parse',
      'barnard59-formats#jsonld/parse/object',
      'barnard59-formats#jsonld/serialize',
      'barnard59-formats#n3/parse',
      'barnard59-formats#ntriples/serialize',
      'barnard59-formats#rdfxml/parse',
      'barnard59-shell#after',
      'barnard59-shell#before',
      'barnard59-shell#shell',
      'barnard59-base#combine',
      'barnard59-base#concat',
      'barnard59-base#concat/object',
      'barnard59-base#filter',
      'barnard59-base#flatten',
      'barnard59-base#glob',
      'barnard59-base#json/parse',
      'barnard59-base#json/stringify',
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
      .appendField('Operation')
      .appendField(new Blockly.FieldDropdown(operationDropdown), 'OPERATION')
    this.appendValueInput('Arguments')
      .appendField('Arguments')
      .setCheck('code:arguments')

    // this.setNextStatement(true, 'String')
    this.setColour(5)
    this.setPreviousStatement(true, 'p:Step')
    this.setNextStatement(true, 'p:Step')
    // this.setOutput(true, 'Step')
  }
}

Blockly.Blocks['b:variable'] = {
  init () {
    this.appendDummyInput('Variable')
      .appendField('Variable')
    this.appendDummyInput()
      .appendField('Name')
      .appendField(new Blockly.FieldTextInput('Name'), 'NAME')
    this.appendDummyInput()
      .appendField('Value')
      .appendField(new Blockly.FieldTextInput('Value'), 'VALUE')
    this.setColour(150)
    this.setPreviousStatement(true, 'p:Variable')
    this.setNextStatement(true, 'p:Variable')
  }
}
