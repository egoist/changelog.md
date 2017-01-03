'use strict'
const exec = require('child_process').exec
const AppError = require('./app-error')

module.exports = function () {
  return new Promise((resolve, reject) => {
    exec('git log', (err, stdout, stderr) => {
      if (err) {
        reject(new AppError(stderr.trim()))
      }
      resolve()
    })
  })
}
