import { getNewThresholdsFromSummary, ratchetThresholds } from './utils'

describe('#getNewThresholdsFromSummary', () => {
  const branches = 0
  const functions = 2
  const lines = 6
  const statements = 3
  const report = {
    total: {
      branches: { pct: branches },
      functions: { pct: functions },
      lines: { pct: lines },
      statements: { pct: statements },
    },
  }

  it('should create summary object', () => {
    expect(getNewThresholdsFromSummary(report)).toEqual({
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
