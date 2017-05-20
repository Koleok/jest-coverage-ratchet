const fs = require('fs')
const R = require('ramda')
const F = require('fluture')

const formatJson = x => JSON.stringify(x, null, 2)
const log = R.tap(x => console.log(formatJson(x)))

exports.log = log
exports.formatJson = formatJson

exports.getNewThresholds = R.compose(
  R.fromPairs,
  R.map(R.over(R.lensIndex(1), R.prop('pct'))),
  R.toPairs,
  R.prop('total')
)

const takeMaxValues = R.reduce(
  (result, [key, val]) =>
    R.merge(result, { [key]: R.max(result[key] || 0, val) }),
  {}
)

exports.ratchetThresholds = R.compose(
  takeMaxValues,
  R.unnest,
  R.map(R.toPairs)
)

exports.thresholdLens = R.lensPath(['jest', 'coverageThreshold', 'global'])

exports.writePackage = R.curry((path, x) =>
  F.node(done => fs.writeFile(path, x, 'utf8', done))
)
