'use strict'
const fs = require('fs')
const commitsBetween = require('commits-between')
const co = require('co')
const semver = require('semver')
const inquirer = require('inquirer')
const chalk = require('chalk')
const AppError = require('./app-error')
const getTag = require('./git-tag')
const ensureCommits = require('./ensure-commits')
const groupCommits = require('./group-commits')
const render = require('./render')
const write = require('./write')
const log = require('./log')
const addCommit = require('./add-commit')
const semanticType = require('./semantic-type')

module.exports = co.wrap(function * ({
  inputVersion
} = {}) {
  if (inputVersion && !semver.valid(inputVersion)) {
    throw new AppError(`${inputVersion} is not a valid version`)
  }

  // check if is a git repo
  if (!fs.existsSync('.git')) {
    throw new AppError('Not a git repository')
  }

  let commits
  let lastVersion
  const lastTag = yield getTag()
  if (lastTag) {
    lastVersion = lastTag.substring(1)
    // get commits since last tag
    commits = yield commitsBetween({from: lastTag})
    if (commits.length === 0) {
      throw new AppError(`No new commits since version ${lastVersion}`)
    }
  } else {
    // check if there're commits before getting commits
    yield ensureCommits()
    // simply get all commits
    commits = yield commitsBetween()

    lastVersion = '0.0.0'
    console.log('  > No git tags, using 0.0.0 as previous version')
  }

  commits = commits.map(commit => {
    const re = /^([^:]+):\s+/
    const match = re.exec(commit.subject)
    const isReleaseMessage = (commit.subject.substring(0, 3) === '-> ') && (semver.valid(commit.subject.substr(3)))
    const isSimpleTweaks = /^tweaks?$/.test(commit.subject)
    if (match && match[1]) {
      const type = semanticType(match[1])
      if (type) {
        commit.subject = commit.subject.replace(re, '')
        commit.type = type
      }
    } else if (isReleaseMessage) {
      commit.type = 'ignore'
    } else if (isSimpleTweaks) {
      commit.type = 'patch'
    }
    return commit
  }).reverse()

  const answers = yield inquirer.prompt(commits
    .filter(commit => !commit.type)
    .map(commit => ({
      name: commit.commit.short,
      message: `Pick a type for commit: \`${commit.subject}\``,
      type: 'list',
      choices: [
        {name: chalk.green('patch'), value: 'patch'},
        {name: chalk.yellow('minor'), value: 'minor'},
        {name: chalk.red('major'), value: 'major'},
        {name: chalk.dim('ignore'), value: 'ignore'}
      ]
    })))

  const groupedCommits = groupCommits(answers, commits)

  if (
    !groupedCommits.major &&
    !groupedCommits.minor &&
    !groupedCommits.patch
  ) {
    throw new AppError('No changelog could be made due to no important commits')
  }

  let newVersion
  if (inputVersion) {
    newVersion = inputVersion
  } else {
    let incType
    // https://github.com/egoist/changelog.md/issues/8
    const unstable = semver.lt(lastVersion, '0.999999999999999.0')
    if (groupedCommits.major) {
      incType = unstable ? 'minor' : 'major'
    } else if (groupedCommits.minor) {
      incType = unstable ? 'patch' : 'minor'
    } else {
      incType = 'patch'
    }
    newVersion = semver.inc(lastVersion, incType)
  }

  if (semver.lt(newVersion, lastVersion)) {
    throw new AppError(`New version (${newVersion}) could not be lower than older version (${lastVersion})`)
  }

  const changeLog = yield render({
    commits: groupedCommits,
    newVersion,
    lastVersion
  })
  yield write(changeLog)

  yield addCommit(newVersion)

  log.success(`Version ${newVersion} has been added into CHANGELOG.md`)
})
