import fs from 'fs-extra'
import program from './program'
import mockCoverageReport from './coverageReport.mock'

const dir = `${process.cwd()}/__test__`
const coveragePath = `${dir}/coverage-summary.json`
const configPath = `${dir}/package.json`

beforeAll(() => {
  fs.outputJsonSync(coveragePath, mockCoverageReport)
  fs.outputJsonSync(configPath, {})
})

afterAll(() => fs.removeSync(dir))

const throwErr = (err) => {
  throw err
}

it('should not crash', () => {
  program([coveragePath, configPath]).fork(throwErr, console.log)
  expect(fs.readJsonSync(configPath)).toMatchSnapshot()
})
