const R = require('ramda')
const F = require('fluture')

const {
  formatJson,
  getCurrentThresholdsFromConfig,
  getNewThresholdsFromSummary,
  getPackageJson,
  getPackageJsonPath,
  logResult,
  ratchetThresholds,
  requireF,
  thresholdLens,
  writeFileF,
} = require('./utils')

module.exports = R.pipe(
  F.of,
  R.chain(([coveragePath, configPath]) =>
    F.both(
      requireF(coveragePath).map(getNewThresholdsFromSummary),
      requireF(configPath).map(getCurrentThresholdsFromConfig)
    )
  ),
  R.map(ratchetThresholds),
  R.map(logResult),
  R.chain(newThresholds =>
    getPackageJson().map(R.set(thresholdLens, newThresholds))
  ),
  R.map(formatJson),
  R.chain(thresholds => F.both(getPackageJsonPath(), F.of(thresholds))),
  R.chain(R.apply(writeFileF))
)
