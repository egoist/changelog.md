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

      if (commits.major) {
        result += addSection('Major Changes', commits.major)
      }

      if (commits.minor) {
        result += addSection('Minor Changes', commits.minor)
      }

      if (commits.patch) {
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
  let title = commit.subject
  let id
  const re = /\s+\(#([0-9]+)\)/
  const matchGitHubSquashed = re.exec(commit.subject)
  if (matchGitHubSquashed) {
    title = title.replace(re, '')
    id = matchGitHubSquashed[1]
  }
  const ref = id ? ` ([#${id}](${url}issues/${id}))` : ''

  return `- ${title}: [\`${commit.commit.short}\`](${url}commit/${commit.commit.short})${ref}`
}).join('\n')}
`
      }
    })
}
