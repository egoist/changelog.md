'use strict'
const gitSemverTags = require('git-semver-tags')

module.exports = function () {
  return new Promise((resolve, reject) => {
    gitSemverTags((err, tags) => {
      if (err) {
        return reject(err)
      }
      resolve(tags[0])
    })
  })
}
