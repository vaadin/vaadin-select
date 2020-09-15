const { createSauceLabsLauncher } = require('@web/test-runner-saucelabs');

const sauceLabsLauncher = createSauceLabsLauncher({
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY
});

const config = {
  nodeResolve: true
};

if (process.env.TEST_ENV === 'sauce') {
  config.concurrency = 1,
  config.browsers = [
    sauceLabsLauncher({
      'sauce:options': {
        name: 'vaadin-select unit tests',
        build: `build ${process.env.TRAVIS_JOB_NUMBER || ''}`
      },
      browserName: 'safari',
      platform: 'macOS 10.14',
      version: '13'
    })
  ];
}

module.exports = config;
