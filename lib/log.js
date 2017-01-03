'use strict'
const chalk = require('chalk')

function log(msg, label) {
  console.log(`\n  ${label} ${msg}\n`)
}

exports.error = function (msg) {
  log(msg, chalk.bgRed.black(' ERROR '))
}

exports.success = function (msg) {
  log(msg, chalk.bgGreen.black(' SUCCESS '))
}

exports.info = function (msg) {
  log(msg, chalk.bgCyan.black(' INFO '))
}

exports.warn = function (msg) {
  log(msg, chalk.bgYellow.black(' WARN '))
}
