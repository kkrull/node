# Jest with TypeScript (`ts-jest`)

* It uses `direnv` to specify and install the version of node.js to be used.
* It uses `yarn` instead of `npm`.  There's a `yarn` script to run tests: `yarn test` or 
  `yarn test --watch`.
* Production and test code are both written in TypeScript, which uses default compiler settings.
* `ts-jest` handles compiling sources before running tests.


## Process

1. Developers _may optionally prefer_ a specific mode–or default to the first supported API–as
   desired.
1. Integration builds _prefer mock mode_, which is supported by any e2e that has started the
   conversion process.
1. Pre-release builds _express no preference_ and use the first supported mode for each e2e.
   * Phase 1-2 e2es run in mock mode, because that's the only mode that's supported.  There's still
     the original e2e file that runs it in real mode.
   * Phase 3-4 e2es run in real mode, to retain existing levels of coverage while the e2e is being
     handed off to QA.
   * Completed e2es run in mock mode, so that GFR releases are not blocked by false negatives when
     the e2e runs with the entire preprod system.
1. QA builds _prefer real mode_, which is supported by any e2e that has reached phase 3.  A separate
   suite can be defined in `e2e-suites.js` to clearly distinguish these suites, if it becomes
   necessary to avoid QA monitoring e2es that support real mode but haven't been formally handed off
   yet.
