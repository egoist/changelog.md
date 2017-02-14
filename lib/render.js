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
        result += addSection('Breaking changes', commits.major)
      }

      if (commits.minor) {
        result += addSection('New features', commits.minor)
      }

      if (commits.patch) {
        result += addSection('Bug fixes', commits.patch)
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
  const matchGitHubSquashed = re.exec(title)
  if (matchGitHubSquashed) {
    title = title.replace(re, '')
    id = matchGitHubSquashed[1]
  }
  const ref = id ? ` ([#${id}](${url}issues/${id}))` : ''

  // match something like closed #1 / fixed #1 / related to #1
  // https://github.com/egoist/changelog.md/issues/10
  title = title.replace(/\s+#([\d]+)$/, ` [#$1](${url}issues/$1)`)

  return `- ${title}: [\`${commit.commit.short}\`](${url}commit/${commit.commit.short})${ref}`
}).join('\n')}
`
      }
    })
}
