'use strict'

module.exports = function (answers, commits) {
  const result = {
    patch: [],
    minor: [],
    major: []
  }

  for (const sha in answers) {
    const type = answers[sha]
    const commit = findOne(commits, sha)
    if (result[type]) {
      result[type].push(commit)
    }
  }

  return result
}

function findOne(commits, sha) {
  return commits.filter(commit => commit.commit.short === sha)[0]
}
