<template>
  <div>
    <div class="workspace-container" ref="workspace-container">
    </div>
    <xml ref="workspace-toolbox" style="display:none">
      <slot></slot>
    </xml>
  </div>
</template>

<script>
import Blockly from 'blockly'

export default {
  name: 'BlocklyComponent',
  props: ['options'],
  data () {
    return {
      workspace: null
    }
  },
  mounted () {
    const options = this.$props.options || {}
    if (!options.toolbox) {
      options.toolbox = this.$refs['workspace-toolbox']
    }
    this.workspace = Blockly.inject(this.$refs['workspace-container'], options)
  }
}
</script>
