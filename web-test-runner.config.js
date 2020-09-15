const { createSauceLabsLauncher } = require('@web/test-runner-saucelabs');

const sauceLabsLauncher = createSauceLabsLauncher({
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY
});

const config = {
  nodeResolve: true
};

const sharedCapabilities = {
  'sauce:options': {
    name: 'vaadin-select unit tests',
    build: `build ${process.env.TRAVIS_JOB_NUMBER || ''}`
  }
};

if (process.env.TEST_ENV === 'sauce') {
  config.concurrency = 1;
  config.browsers = [
    sauceLabsLauncher({
      ...sharedCapabilities,
      browserName: 'safari',
      platform: 'macOS 10.14',
      version: '13'
    }),
    sauceLabsLauncher({
      ...sharedCapabilities,
      browserName: 'safari',
      platform: 'iOS Simulator',
      version: '13.1'
    })
  ];
}

module.exports = config;
