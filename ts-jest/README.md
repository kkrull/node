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


## Plan to finish

### Why we're doing this

We have an e2e that's all the way through the conversion process, but it's still running in `real`
mode when we run the [spinnaker `gfr-e2e-prerelease`
pipeline](https://prod.spinnaker.ghbeta.com/#/applications/gfr/executions?pipeline=gfr-e2e-prerelease),
to get ready for releasing GFR.  The converted e2e can still fail because of failures in the
backend–even though GFR itself is working–and this delays the release.

Some friends in QA (Oliver and Chris: ask Jerry or Nathan Weber for contacts) have kindly agreed to
run this e2e in `real` mode in a separate process, so any failures can be triaged outside of the GFR
release process.

TL;DR - we need to get GFR prerelease to run this e2e in `mock` mode and we need QA to start running
it in `real` mode.

### JIRA

This work will need to be done in two PRs and two stories, to jive with the way GFR releases work.

1. PLEX-3402 already exists, and it's the story I've been working on.  Use this for the update to
   `spinnaker-modules` (see below).
1. A distinct story needs to be created for the update to GFR, and it needs to be in the `Grubhub
   for Restaurants` project in JIRA.  Commiting a PLEX- story to GFR messes things up during the
   release, so it's got to start with GFR-.


### Work Breakdown

#### GFR Story

1. `gfr-orders` e2e code needs some updates to
  * add another `mock-external` option to `PREFERRED_API`, in `TestDriverConfig`
    (`projects/restaurant/subapps/gfr-orders/e2e/orders/preorders/test-driver-config.js`).
  * add another e2e classification for phase 4 (`TestDriverConfig::externallyMonitored`) so we know
    which e2es have made it all the way through the conversion process.  These e2es should run in
    `mock` mode instead of `real` mode during prerelease, so that we get the incremental benefit of
    an e2e completing the process without waiting for all e2es to be converted (which will take too
    long).
  * configure the pickup-preorders e2e
    (`projects/restaurant/subapps/gfr-orders/e2e/configurable-fixture/pickup-orders-preorders-e2e.js`)
    to designate itself as `TestDriverConfig::externallyMonitored` instead of
    `TestDriverConfig::withMockAndRealAPISupport`.

1. Documentation in `gfr-orders` could use a table describing how e2es run given their current phase
   in the conversion process and the value (or abscence of) `PREFERRED_API`:
   * phase 1-2 e2es support mock mode only.  They run that way all the time, regardless of
     `PREFERRED_API`.  You know an e2e is in this phase because it says
     `TestDriverConfig.withOnlyMockAPISupport` at the top of the e2e file.
   * phase 3 e2es support mock+real modes and will respect `PREFERRED_API`.  Prerelease
     (`PREFERRED_API=mock-external`) runs in real mode, because it's not through the conversion
     process and not monitored by QA yet.  You know an e2e is in this phase because it says
     `TestDriverConfig.withMockAndRealAPISupport` at the top of the e2e file.
   * phase 4 e2es support mock+real modes, and will respect `PREFERRED_API`.  Prerelease runs in
     `mock` mode, because now it's through the conversion process and QA is running it in `real`
     mode.  You know an e2e is in this phase because it will say
     `TestDriverConfig.externallyMonitored` at the top of the e2e file.
   * I suggest updating the `PREFERRRED_API` section here:
     `projects/restaurant/subapps/gfr-orders/README.md`
   * Add a note saying
     * If you want all e2es that support `real` mode to run in `real` mode–call `yarn e2e-real-mode`
       (which sets `PREFERRED_API=real`).  Note the "supported" caveat here: Phase 1-2 e2es don't
       support `real` mode yet, so they have to fall back to `mock` mode.
     * If you want all e2es that have started the conversion process to run in `mock` mode, call
       `PREFERRED_API=mock yarn e2e`.  Note this has fewer caveats about "support" because all e2es
       start the conversion process by adding support for mock mode (they always start in phase 1).


#### PLEX-3402 story

1. `spinnaker-modules` pipeline configuration needs to be updated so that–during prerelease–it says
   `env_variables="PREFERRED_API=mock-external"` instead of `real`.  Work with Bryan Wain (owns the
   subapp platform and GFR-related spinnaker pipelines) and Jody Lent (SRE who looked at my last PR
   for `spinnaker-modules`).
   * See my prior PR here, which contains the setting to be changed:
     https://github.com/GrubhubProd/spinnaker-modules/pull/561 
   * Only `v2/pipeline/build/gfr/gfr-e2e-prerelease.json.j2` needs to be updated this time.

1. Communicate with QA (Oliver and Chris) so they know which e2es to monitor and how to run them in
   `real` mode.
  * Which e2es should they be running?  The `configrurableFixture` suite in `e2e-suites.js`.
  * How to run just these e2es and force them to use `real` mode?  
    `yarn e2e-real-mode --suites=configurableFixture --start-server`

1. Communicate the status update to
   * `#gfr-orders-e2e-stability`
   * `#gfr-release-tracking`
