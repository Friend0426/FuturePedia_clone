const defaults = {nonTextBehavior: 'remove'}

module.exports = function blocksToText(blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts)
  const blockArray = Array.isArray(blocks) ? blocks : [{ children: [{ text: blocks }], _type: 'block' }]
  return blockArray
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}
