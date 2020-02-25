const R = require('ramda')
const F = require('fluture')

const {
  addLineBreak,
  formatJson,
  getThresholdLens,
  getCurrentThresholdsFromConfig,
  getNewThresholdsFromSummary,
  resolveToRoot,
  logResult,
  ratchetThresholds,
  requireF,
  writeFileF,
} = require('./utils')

module.exports = R.pipe(
  F.of,
  R.map(R.map(resolveToRoot)),
  R.chain(([coveragePath, configPath]) =>
    F.both(
      requireF(coveragePath).map(getNewThresholdsFromSummary),
      requireF(configPath).map(getCurrentThresholdsFromConfig)
    )
      .map(ratchetThresholds)
      .map(logResult)
      .chain(newThresholds =>
        requireF(configPath).map(
          R.set(getThresholdLens(configPath), newThresholds)
        )
      )
  ),
  R.map(R.tap(console.log)),
  R.map(formatJson),
  R.map(addLineBreak)
  // R.chain(thresholds => F.both(getPackageJsonPath(), F.of(thresholds)))
  // R.chain(R.apply(writeFileF))
)
