/**
 * Based on https://github.com/google/blockly-samples/tree/671586b1c0797779821bbf902f707ede97192b2b/codelabs/custom_renderer
 * Apache-2.0 - Copyright 2020 Google LLC
 */

import * as Blockly from 'blockly/core'

function notch (params) {
  const { width, height, peak } = Object.assign({ width: 4.5, height: 10, peak: 7 }, params)
  return {
    type: 2,
    width: width * 2 + peak,
    height: height,
    pathLeft: ` l ${width},${height}  ${peak},0  ${width},-${height} `,
    pathRight: ` l -${width},${height}  -${peak},0  -${width},-${height} `
  }
}

const notches = {
  NONE: notch({ width: 4.5, height: 0, peak: 7 }),
  NORMAL: notch({ width: 5.5, height: 10, peak: 2 }),
  OBJECT: notch({ width: 0, height: 10, peak: 15 })
}

function puzzle (params) {
  return {
    type: 1,
    width: 8,
    height: 15,
    pathDown: ' c 0,10  -8,-8  -8,7.5  s 8,-2.5  8,7.5 ',
    pathUp: ' c 0,-10  -8,8  -8,-7.5  s 8,2.5  8,-7.5 '
  }
}

function inputNotchFor (block) {
  if (block._pipeTypes.includes('p:Writable')) {
    return notches.NORMAL
  }
  if (block._pipeTypes.includes('p:WritableObjectMode')) {
    return notches.OBJECT
  }
  return notches.NONE
}

function outputNotchFor (block) {
  if (block._pipeTypes.includes('p:Readable')) {
    return notches.NORMAL
  }
  if (block._pipeTypes.includes('p:ReadableObjectMode')) {
    return notches.OBJECT
  }
  return notches.NONE
}

function isDynamicBlock (block) {
  return !!block?._dynamicBlock
}

class CustomConstantsProvider extends Blockly.blockRendering.ConstantProvider {
  shapeFor (connection) {
    const isPipeline = connection.sourceBlock_.type === 'p:Pipeline'
    const isDynamic = isDynamicBlock(connection.sourceBlock_)
    const pipelineNotchOverStep = !connection.check_ && connection.sourceBlock_?.nextConnection?.check_?.includes('p:Pipeline')
    if (pipelineNotchOverStep) {
      return notches.NONE
    }

    switch (connection.type) {
      case Blockly.INPUT_VALUE:
      case Blockly.OUTPUT_VALUE:
        return this.PUZZLE_TAB
      case Blockly.PREVIOUS_STATEMENT:
        if (connection.sourceBlock_) {
          if (isDynamic) {
            return inputNotchFor(connection.sourceBlock_)
          }
          if (isPipeline) {
            const children = connection.sourceBlock_?.childBlocks_
            const lastChild = children[0]
            if (children && isDynamicBlock(lastChild)) {
              return inputNotchFor(lastChild)
            }
            return notches.NONE
          }
        }
        return this.NOTCH
      case Blockly.NEXT_STATEMENT:
        if (connection.sourceBlock_) {
          if (isDynamic) {
            return outputNotchFor(connection.sourceBlock_)
          }
          if (isPipeline) {
            let children = connection.sourceBlock_.getChildren(true)
            let lastChild = children[children.length - 1]
            let lastDynamicBlock = isDynamicBlock(lastChild) ? lastChild : null
            while (children && lastChild) {
              children = lastChild.getChildren(true)
              lastChild = children[children.length - 1]
              if (!lastChild || !isDynamicBlock(lastChild)) {
                break
              }
              lastDynamicBlock = lastChild
            }

            if (lastDynamicBlock) {
              return outputNotchFor(lastDynamicBlock)
            }
            return notches.NONE
          }
        }
        return this.NOTCH
      default:
        throw Error('Unknown type')
    }
  }
};

class CustomRenderer extends Blockly.blockRendering.Renderer {
  makeConstants_ () {
    return new CustomConstantsProvider()
  }
};

Blockly.blockRendering.register('custom_renderer', CustomRenderer)
