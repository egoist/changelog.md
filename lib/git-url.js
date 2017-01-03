'use strict'
const parseGitUrl = require('git-url-parse')
const remoteOriginUrl = require('git-remote-origin-url')

module.exports = function () {
  return remoteOriginUrl()
    .then(url => {
      const parsed = parseGitUrl(url)
      return {
        url: `https://${parsed.source}/${parsed.owner}/${parsed.name}/`,
        username: parsed.owner,
        repo: parsed.name,
        source: parsed.source
      }
    })
}
