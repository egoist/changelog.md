'use strict'
const gitUrl = require('./git-url')

module.exports = function ({
  commits,
  newVersion,
  lastVersion
} = {}) {
  return gitUrl()
    .then(({url}) => {
      const d = new Date()
      const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      let result = `## [Version ${newVersion}](${url}releases/tag/v${newVersion}) (${date})\n`

      if (commits.major.length > 0) {
        result += addSection('Major Changes', commits.major)
      }

      if (commits.minor.length > 0) {
        result += addSection('Minor Changes', commits.minor)
      }

      if (commits.patch.length > 0) {
        result += addSection('Patches', commits.patch)
      }

      // no need to compare with v0.0.0
      if (lastVersion !== '0.0.0') {
        result += `\n[...full changes](${url}compare/v${lastVersion}...v${newVersion})\n\n`
      }

      return result

      function addSection(heading, commits) {
        return `
### ${heading}

${commits.map(commit => {
  // reference Issue and PR
  const match = /\s#([0-9]+)/.exec(commit.subject)
  const id = match && match[1]
  const ref = id ? ` ([#${id}](${url}issues/${id}))` : ''

return `- ${commit.subject}: [\`${commit.commit.short}\`](${url}commit/${commit.commit.short})${ref}`
}).join('\n')}
`
      }
    })
}
