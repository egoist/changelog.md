'use strict'

module.exports = function (answers, commits) {
  const result = {
    patch: null,
    minor: null,
    major: null
  }

  while (commits.length) {
    const commit = commits.shift()
    if (commit.type) {
      result[commit.type] = result[commit.type] || []
      result[commit.type].push(commit)
    } else {
      const type = answers[commit.commit.short]
      if (type !== 'ignore') {
        result[type] = result[type] || []
        result[type].push(commit)
      }
    }
  }

  return result
}
