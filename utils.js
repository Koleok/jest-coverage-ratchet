const fs = require('fs')
const R = require('ramda')
const F = require('fluture')

exports.getNewThresholds = R.pipe(
  R.prop('total'),
  R.toPairs,
  R.map(R.over(R.lensIndex(1), R.prop('pct'))),
  R.fromPairs
)

const formatJson = x => JSON.stringify(x, null, 2)
const log = R.tap(x => console.log(formatJson(x)))

exports.log = log
exports.formatJson = formatJson

exports.thresholdLens = R.lensPath(['jest', 'coverageThreshold', 'global'])

exports.writePackage = R.curry((path, x) =>
  F.node(done => fs.writeFile(path, x, 'utf8', done)))
