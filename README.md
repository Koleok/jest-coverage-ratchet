# jest-coverage-ratchet

Raises `jest`'s minimum coverage thresholds _(per category)_ if current coverage is higher.

## What does it do?

Lets say you have some [jest coverage thresholds](https://facebook.github.io/jest/docs/configuration.html#coveragethreshold-object) set in the `package.json` for your project at the following values:
```javascript
{
  "branches": 30,
  "functions": 30,
  "lines": 30,
  "statements": 50,
}
```

then you get inspired one day and write lots of tests. Now your actual coverage summary might look like this:
```javascript
{
  "branches": 50,
  "functions": 60,
  "lines": 77,
  "statements": 50,
}
```

Great 🌸‼ Except you'd really like your accomplishment to set the new standard for test coverage in this project. **`jest-coverage-ratchet` just does that automatically by looking at your current coverage summary, comparing it to your specified coverage thresholds, and updating the minimum for any threshold that is higher in the summary.**

So given the previous values, running this script will update your coverage thresholds specified in the `jest` key of `package.json` to the following values:
```javascript
{
  "branches": 50,
  "functions": 60,
  "lines": 77,
  "statements": 50,
}
```

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

I know what happens [when you assume](http://www.urbandictionary.com/define.php?term=Assume), but `jest-coverage-ratchet` makes the following assumptions about your project.

- `jest` has been run for project at least once with `--coverage` so that there is a valid file at the path `./coverage/coverage-summary.json` _(alternatively pass a path with `--coverageSummaryPath` of `./your/path/to/coverage-summary.json`)_
- `jest` configuration object is present in the `package.json` that specifies at least:
  - [coverage thresholds](https://facebook.github.io/jest/docs/configuration.html#coveragethreshold-object) _(alternatively pass a path with `--configPath` of `./your/path/to/jest.config.json`)_
  - `'json-summary'` in your jest config's [reporters list](https://facebook.github.io/jest/docs/configuration.html#coveragereporters-array-string) like so:
  ```javascript
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

Should this tool support things like jest config files and piping the coverage data in as an argument? Of course it should. If you want to build that and send a PR I will be all smiles 😀✨. If not then you probably see me do it _eventually_.

## Questions?
Just submit an issue or a PR, I'm no elitist.
