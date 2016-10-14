'use strict'

module.exports = (input, opts) => {
  if ('string' !== typeof input) {
    throw new TypeError(`Expected a string, got ${typeof input}`)
  }

  opts = opts || {}

  return input + ' & ' + (opts.postfix || 'rainbows')
}
