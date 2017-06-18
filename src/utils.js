const R = require('ramda')
const F = require('fluture')
const fs = require('fs-extra')
const { resolve } = require('path')
const { bold, green, red } = require('chalk')

//    addLineBreak :: String -> String
const addLineBreak = R.concat(R.__, '\n')

//    formatJson :: Object -> String
const formatJson = x => JSON.stringify(x, null, 2)

//    log :: Object -> Object
const log = R.tap(x => console.log(formatJson(x)))

const logResult = R.tap(x =>
  console.log(`
${bold('new coverage thresholds:')}
${green(formatJson(x))}
`)
)

const logError = err =>
  console.error(`
${red.bold('There was a problem ratcheting thresholds')}
=========================================
${red(err)}
`)

const logSuccess = () => console.log(bold('coverage thresholds ratcheted 🔧'))

//    getNewThresholdsFromSummary :: Object -> Object
const getNewThresholdsFromSummary = R.compose(
  R.fromPairs,
  R.map(R.over(R.lensIndex(1), R.prop('pct'))),
  R.toPairs,
  R.prop('total')
)

//    takeMaxValues :: [(String, String)] -> Object
const takeMaxValues = R.reduce(
  (result, [key, val]) =>
    R.merge(result, { [key]: R.max(result[key] || 0, val) }),
  {}
)

const configPath = ['coverageThreshold', 'global']

//    thresholdLens :: Lens
const thresholdLens = R.lensPath(['jest', ...configPath])

//    ratchetThresholds :: (Object, Object) -> Object
const ratchetThresholds = R.compose(takeMaxValues, R.unnest, R.map(R.toPairs))

//    String -> Future a Error
const requireF = F.encase(require)

//    getConfig :: String -> Future Object Error
const getCurrentThresholdsFromConfig = R.ifElse(
  R.has('jest'),
  R.path(['jest', ...configPath]),
  R.path(configPath)
)

//    getPackageJsonPath :: () -> Future String Error
const getPackageJsonPath = () =>
  F.of(process.cwd()).map(rootDir => resolve(rootDir, 'package.json'))

//    getPackageJson :: () -> Future Object Error
const getPackageJson = () => getPackageJsonPath().chain(requireF)

//    writePackage :: String -> Object -> Future Object Error
const writeFileF = R.curry((path, x) =>
  F.node(done => fs.writeFile(path, x, 'utf8', done))
)

module.exports = {
  addLineBreak,
  formatJson,
  getCurrentThresholdsFromConfig,
  getNewThresholdsFromSummary,
  getPackageJson,
  getPackageJsonPath,
  log,
  logError,
  logResult,
  logSuccess,
  ratchetThresholds,
  requireF,
  thresholdLens,
  writeFileF,
}
