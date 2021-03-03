import * as Blockly from 'blockly/core'

Blockly.Blocks.plists_create_with = {
  init () {
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL)
    this.setStyle('list_blocks')
    this.itemCount_ = 1
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
    const container = Blockly.utils.xml.createElement('mutation')
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
    let itemBlock = containerBlock.getInputTargetBlock('STACK')
    // Count number of inputs.
    const connections = []
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_)
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock()
    }
    // Disconnect any children that don't belong.
    for (let i = 0; i < this.itemCount_; i++) {
      const connection = this.getInput('ADD' + i).connection.targetConnection
      if (connection && !connections.includes(connection)) {
        connection.disconnect()
      }
    }
    this.itemCount_ = connections.length
    this.updateShape_()
    // Reconnect any child blocks.
    for (let i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i)
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('STACK')
    let i = 0
    while (itemBlock) {
      const input = this.getInput('ADD' + i)
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
    let i = 0
    for (; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        const input = this.appendValueInput('ADD' + i)
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
  },

  onchange () {
    // always have one empty slot
    if (this.allInputsFilled()) {
      this.itemCount_++
      this.updateShape_()
    } else {
      // remove empty slots until only one is left
      const emptyFields = []
      for (let i = 0; i < this.itemCount_; i++) {
        const p = this.getInput('ADD' + i)
        if (!p.connection.targetConnection) {
          emptyFields.push(i)
        }
      }
      if (emptyFields.length > 1) {
        emptyFields.reverse()
        emptyFields.forEach((field) => {
          this.removeInput('ADD' + field)
          this.itemCount_--
        })
        this.updateShape_()
      }
    }
  }
}
