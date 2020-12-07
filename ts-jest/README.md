# Jest with TypeScript (`ts-jest`)

* It uses `direnv` to specify and install the version of node.js to be used.
* It uses `yarn` instead of `npm`.  There's a `yarn` script to run tests: `yarn test` or 
  `yarn test --watch`.
* Production and test code are both written in TypeScript, which uses default compiler settings.
* `ts-jest` handles compiling sources before running tests.
