import * as Blockly from 'blockly/core'

function isDynamicBlock (block) {
  return !!block?._dynamicBlock
}

const typeCheckDynamicBlocks = (a, b) => {
  if (!a._dynamicBlock) return false
  if (!b._dynamicBlock) return false

  const aPipe = a._pipeTypes
  const bPipe = b._pipeTypes
  if (aPipe.includes('p:Readable') && bPipe.includes('p:Writable')) {
    return true
  }
  if (aPipe.includes('p:ReadableObjectMode') && bPipe.includes('p:WritableObjectMode')) {
    return true
  }

  return false
}

Blockly.ConnectionChecker.prototype.doTypeChecks = function (a, b) {
  if (!a.isSuperior()) {
    [b, a] = [a, b]
  }

  // connecting pipelines needs custom logic because their "type"
  // is based on their first and last step
  if (a.sourceBlock_.type === 'p:Pipeline' && b.sourceBlock_.type === 'p:Pipeline') {
    const dynamicA = a.sourceBlock_.getDescendants(true).filter(isDynamicBlock)
    if (dynamicA.length) {
      const lastFromPipelineA = dynamicA[dynamicA.length - 1]
      const firstFromPipelineB = b.sourceBlock_.getChildren(true).map(({ id, _dynamicBlock, _pipeTypes }) => ({ id, _dynamicBlock, _pipeTypes }))[0]

      if (firstFromPipelineB) {
        if (lastFromPipelineA.id === firstFromPipelineB.id) {
          return false
        }

        return typeCheckDynamicBlocks(lastFromPipelineA, firstFromPipelineB)
      }
      return true
    }
  }

  const checkArrayOne = a.getCheck()
  const checkArrayTwo = b.getCheck()

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

  if (isDynamicBlock(a.sourceBlock_) && isDynamicBlock(b.sourceBlock_)) {
    return typeCheckDynamicBlocks(a.sourceBlock_, b.sourceBlock_)
  }
  return false
}

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

Blockly.Blocks['code:EcmaScriptTemplateLiteral'] = {
  init () {
    this.appendDummyInput()
      .appendField('Template Literal')
      .appendField(new Blockly.FieldTextInput('Code'), 'ECMASCRIPTCODE')
    this.setInputsInline(true)
    this.setOutput(true, ['code:EcmaScriptTemplateLiteral'])
  }
}

// Block for variable getter.
Blockly.Blocks.variables_get_dynamic = {
  init () {
    this.setColour(150)
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('VAR_NAME', null, ['p:Variable'], 'p:Variable'), 'VAR')
    this.setOutput(true, ['p:Variable'])
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
