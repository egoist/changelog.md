'use strict'

module.exports = function (type) {
  const types = {
    docs: 'ignore',
    fix: 'patch',
    feat: 'minor',
    style: 'ignore',
    refactor: 'patch',
    chore: 'ignore',
    test: 'ignore',
    breaking: 'major'
  }
  if (types[type]) {
    return types[type]
  }
  return null
}
