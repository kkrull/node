// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  baseUrl: 'http://localhost:4200/',
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    print: function() { },
    showColors: true
  },
  onPrepare: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ]
};
