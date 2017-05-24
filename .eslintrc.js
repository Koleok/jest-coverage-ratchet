module.exports = {
  env: {
    jest: true,
    node: true,
  },
  parser: 'babel-eslint',
  plugins: ['import'],
  extends: ['airbnb', 'plugin:import/errors', 'plugin:import/warnings'],
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'func-names': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'max-len': ['error', { code: 80, ignoreComments: true }],
    'new-cap': 0,
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-confusing-arrow': 0,
    'no-console': 0,
    'no-mixed-operators': 0,
    'no-underscore-dangle': 0,
    semi: ['error', 'never'],
  },
}
