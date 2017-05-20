module.exports = {
  env: {
    jest: true,
    node: true,
  },
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
    semi: ['error', 'never'],
    'max-len': ['error', { code: 80, ignoreComments: true }],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-console': 0,
    'func-names': 0,
    'import/extensions': 0,
    'no-mixed-operators': 0,
    'no-confusing-arrow': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/no-dynamic-require': 0,
    'new-cap': 0,
    'no-underscore-dangle': 0,
  },
};
