'use strict'
const path = require('path')
const child = require('child_process')
const fs = require('mz/fs')
const co = require('co')

function exec(cmd) {
  return new Promise((resolve, reject) => {
    child.exec(cmd, (err, stdout) => {
      if (err) {
        return reject(err)
      }
      resolve(stdout)
    })
  })
}

module.exports = co.wrap(function * (version) {
  const file = path.join(process.cwd(), 'package.json')
  let pkg
  try {
    pkg = require(file) // eslint-disable-line import/no-dynamic-require
    pkg.version = version
    yield fs.writeFile(file, JSON.stringify(pkg, null, 2), 'utf8')
  } catch (err) {
    // silently
  }
  yield exec(`git add CHANGELOG.md package.json && git commit -m "-> v${version}" && git tag -a v${version} -m "Version ${version}"`)
})
