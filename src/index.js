const { argv } = require('yargs')
const { resolve } = require('path')
const { logError, logSuccess } = require('./utils')
const program = require('./program')

const defaultCoveragePath = 'coverage/coverage-summary.json'
const defaultConfigPath = 'package.json'

const projectDir = process.cwd()
const coveragePath = resolve(projectDir, argv.coverage || defaultCoveragePath)
const configPath = resolve(projectDir, argv.config || defaultConfigPath)

program([coveragePath, configPath]).fork(logError, logSuccess)
