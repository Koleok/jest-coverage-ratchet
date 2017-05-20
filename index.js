const R = require('ramda')
const F = require('fluture')
const { red, yellow } = require('chalk')

const {
  getNewThresholds,
  writePackage,
  thresholdLens,
  formatJson,
} = require('./utils')

const projectDir = process.cwd()
const packagePath = `${projectDir}/package.json`
const packageJson = require(packagePath)

const program = x => F.of(x)
  .map(getNewThresholds)
  .map(R.set(thresholdLens, R.__, packageJson))
  .map(formatJson)
  .chain(writePackage)

const coverage = require(`${projectDir}/coverage/coverage-summary.json`)
program(coverage).fork(console.error, console.log)
