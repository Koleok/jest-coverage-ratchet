const fs = require('fs');
const R = require('ramda');
const F = require('fluture');

const projectDir = process.cwd();
const coverage = require(`${projectDir}/coverage/coverage-summary.json`);
const packageJson = require(`${projectDir}/package.json`);

const packagePath = `${process.cwd()}/package.json`;
const thresholdLens = R.lensPath(['jest', 'coverageThreshold', 'global']);
const writePackage = x => F.node(done => fs.writeFile(packagePath, x, 'utf8', done));

const getNewThresholds = R.pipe(
  R.prop('total'),
  R.toPairs,
  R.map(R.over(R.lensIndex(1), R.prop('pct'))),
  R.fromPairs
);

F.of(coverage)
  .map(getNewThresholds)
  .map(R.set(thresholdLens, R.__, packageJson))
  .map(x => JSON.stringify(x, null, 2))
  .chain(writePackage)
  .fork(console.error, console.log);
