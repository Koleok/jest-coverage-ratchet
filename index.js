#!/usr/bin/env node
const R = require('ramda')
const F = require('fluture')
const { bold, green } = require('chalk')

const {
  getNewThresholds,
  ratchetThresholds,
  writePackage,
  thresholdLens,
  formatJson,
} = require('./utils')

const projectDir = process.cwd()
const packagePath = `${projectDir}/package.json`
const packageJson = require(packagePath)
const existingThresholds = R.view(thresholdLens, packageJson)
const coverage = require(`${projectDir}/coverage/coverage-summary.json`)

const logResult = R.tap(x =>
  console.log(`
${bold('new coverage thresholds:')}
${green(formatJson(x))}
`)
)

const program = x =>
  F.of(x)
    .map(getNewThresholds)
    .map(R.pair(existingThresholds))
    .map(ratchetThresholds)
    .map(logResult)
    .map(R.set(thresholdLens, R.__, packageJson))
    .map(formatJson)
    .chain(writePackage(packagePath))

program(coverage).fork(console.error, () =>
  console.log(bold('coverage thresholds ratcheted 🔧'))
)
