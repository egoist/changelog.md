'use strict'

module.exports = function (type) {
  const types = {
    docs: 'ignore',
    doc: 'ignore',
    tweaks: 'patch',
    tweak: 'patch',
    fix: 'patch',
    fixes: 'patch',
    feat: 'minor',
    style: 'ignore',
    refactor: 'patch',
    chore: 'ignore',
    test: 'ignore',
    breaking: 'major',
    perf: 'patch'
  }
  if (types[type]) {
    return types[type]
  }
  return null
}
