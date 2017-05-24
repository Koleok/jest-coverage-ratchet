const { argv } = require('yargs')
const { resolve } = require('path')
const { logError, logSuccess } = require('./utils')
const program = require('./program')

const defaultCoveragePath = 'coverage/coverage-summary.json'
const defaultConfigPath = 'package.json'
const currentWorkingDir = process.cwd()

const coveragePath = resolve(
  currentWorkingDir,
  argv.coverageSummaryPath || defaultCoveragePath
)

const configPath = resolve(
  currentWorkingDir,
  argv.configPath || defaultConfigPath
)

program([coveragePath, configPath]).fork(logError, logSuccess)
