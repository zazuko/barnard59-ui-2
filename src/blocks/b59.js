import * as Blockly from 'blockly/core'

Blockly.ConnectionChecker.prototype.doTypeChecks = (a, b) => {
  if (!a.isSuperior()) {
    [b, a] = [a, b]
  }
  const checkArrayOne = a.getCheck()
  // if (a.sourceBlock_._dynamicBlock) checkArrayOne.push(...a.sourceBlock_._pipeTypes)
  const checkArrayTwo = b.getCheck()
  // if (b.sourceBlock_._dynamicBlock) checkArrayOne.push(...b.sourceBlock_._pipeTypes)

  if (!checkArrayOne || !checkArrayTwo) {
    // One or both sides are promiscuous enough that anything will fit.
    return true
  }
  // Find any intersection in the check lists.
  for (let i = 0; i < checkArrayOne.length; i++) {
    if (checkArrayTwo.includes(checkArrayOne[i])) {
      return true
    }
  }
  if (!a.sourceBlock_._dynamicBlock) return false
  if (!b.sourceBlock_._dynamicBlock) return false

  const aPipe = a.sourceBlock_._pipeTypes
  const bPipe = b.sourceBlock_._pipeTypes
  if (
    (aPipe.includes('p:Readable') && bPipe.includes('p:Writable')) ||
    (aPipe.includes('p:ReadableObjectMode') && bPipe.includes('p:WritableObjectMode'))
  ) {
    return true
  }

  return false
}

// Blockly.ConnectionChecker.prototype.doTypeChecks

Blockly.Blocks['p:Pipeline'] = {
  init () {
    this.appendDummyInput()
      .appendField('Pipeline')
      .appendField(new Blockly.FieldTextInput('Name'), 'NAME')
    this.appendDummyInput()
    this.appendValueInput('VARIABLES')
      .setCheck(['Array'])
      .appendField('variables')
    this.appendStatementInput('STEPLIST')
      // .setCheck(['p:Step'])
      .appendField('steps')
    this.setColour(230)
    this.setTooltip('hey')
    this.setHelpUrl('https://example.com')
    this.setPreviousStatement(true, ['p:Pipeline'])
    this.setNextStatement(true, ['p:Pipeline'])
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
Blockly.Blocks.variables_get_dynamic = {
  init () {
    this.setColour(150)
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('VAR_NAME', null, ['p:Variable'], 'p:Variable'), 'VAR')
    this.setOutput(true, 'p:Variable')
  }
}

// Block for variable setter.
Blockly.Blocks.variables_set_dynamic = {
  init () {
    this.setColour(150)
    this.appendDummyInput('Variable')
      .appendField('Variable')
    this.appendDummyInput()
      .appendField('Name')
      .appendField(new Blockly.FieldVariable('VAR_NAME', null, ['p:Variable'], 'p:Variable'), 'VAR')
    this.appendDummyInput()
      .appendField('Value')
      .appendField(new Blockly.FieldTextInput('Value'), 'VALUE')
    this.setPreviousStatement(true, ['p:Variable'])
    this.setNextStatement(true, ['p:Variable'])
    this.data = 'variable IRI'
  }
}