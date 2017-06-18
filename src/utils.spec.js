import { getNewThresholdsFromSummary, ratchetThresholds } from './utils'
import mockCoverageReport, {
  branches,
  functions,
  lines,
  statements,
} from './coverageReport.mock'

describe('#getNewThresholdsFromSummary', () => {
  it('should create summary object', () => {
    expect(getNewThresholdsFromSummary(mockCoverageReport)).toEqual({
      branches,
      functions,
      lines,
      statements,
    })
  })
})

describe('#ratchetThresholds', () => {
  const a = { a: 1, b: 2 }
  const b = { a: 3, b: 4 }

  it('should retain all keys of both while selecting highest values', () => {
    expect(ratchetThresholds([a, b])).toEqual(b)
  })
})
