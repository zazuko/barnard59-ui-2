import * as Blockly from 'blockly/core'

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
      .setCheck(['p:Variable', 'code:EcmaScript'])

    this.setColour(5)
    this.setPreviousStatement(true, ['p:Step'])
    this.setNextStatement(true, ['p:Step'])
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
      .appendField(new Blockly.FieldVariable(
        'VAR_NAME', null, ['p:Variable'], 'p:Variable'), 'VAR')
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
      .appendField(new Blockly.FieldVariable(
        'VAR_NAME', null, ['p:Variable'], 'p:Variable'), 'VAR')
    this.appendDummyInput()
      .appendField('Value')
      .appendField(new Blockly.FieldTextInput('Value'), 'VALUE')
    this.setPreviousStatement(true, ['p:Variable'])
    this.setNextStatement(true, ['p:Variable'])
    this.data = 'variable IRI'
  }
}

Blockly.Blocks.plists_create_with = {
  init () {
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL)
    this.setStyle('list_blocks')
    this.itemCount_ = 3
    this.updateShape_()
    this.setOutput(true, 'Array')
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']))
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP)
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom () {
    var container = Blockly.utils.xml.createElement('mutation')
    container.setAttribute('items', this.itemCount_)
    return container
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10)
    this.updateShape_()
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose (workspace) {
    const containerBlock = workspace.newBlock('lists_create_with_container')
    containerBlock.initSvg()
    let connection = containerBlock.getInput('STACK').connection
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock('lists_create_with_item')
      itemBlock.initSvg()
      connection.connect(itemBlock.previousConnection)
      connection = itemBlock.nextConnection
    }
    return containerBlock
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK')
    // Count number of inputs.
    var connections = []
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_)
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock()
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection
      if (connection && !connections.includes(connection)) {
        connection.disconnect()
      }
    }
    this.itemCount_ = connections.length
    this.updateShape_()
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i)
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK')
    var i = 0
    while (itemBlock) {
      var input = this.getInput('ADD' + i)
      itemBlock.valueConnection_ = input && input.connection.targetConnection
      i++
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_ () {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY')
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
        .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE)
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i)
          .setAlign(Blockly.ALIGN_RIGHT)
        if (i === 0) {
          input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH)
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i)
      i++
    }
  }
}
