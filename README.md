# jest-coverage-ratchet

Raises `jest`'s minimum coverage thresholds _(per category)_ if current coverage is higher.

## Installation

Just add as a dev dependency to your project like
```bash
npm install --save-dev jest-coverage-ratchet
```

or

```bash
yarn add --dev jest-coverage-ratchet
```

I recommend then using the binary `jest-coverage-ratchet` as part of a [`prepush` hook](https://github.com/typicode/husky).

## Assumptions

I know what happens [when you assume](http://www.urbandictionary.com/define.php?term=Assume), but in order to get this working on a project quickly, `jest-coverage-ratchet` makes the following assumptions about your project.

- `jest` configuration object is present in the `package.json` that specifies [coverage thresholds](https://facebook.github.io/jest/docs/configuration.html#coveragethreshold-object) and at least the `json-summary` [reporter](https://facebook.github.io/jest/docs/configuration.html#coveragereporters-array-string) like so:
```js
{
  // ...
  "jest": {
    "coverageReporters": [
      "json-summary"
    ],
    "coverageThreshold": {
      "global": {
        "branches": Number,
        "functions": Number,
        "lines": Number,
        "statements": Number,
      }
    }
  },
  // ...
}
```

- `jest` has been run for project at least once with `--coverage` so that there is a valid file at the path `./coverage/coverage-summary.json`

Should this tool support things like jest config files and piping the coverage data in as an argument? Of course it should. If you want to build that and send a PR I will be all smiles 😀✨. If not then you probably see me do it _eventually_.

## Questions?
Just submit an issue or a PR, I'm no elitist.
