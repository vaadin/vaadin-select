/* eslint-env node */
const { createSauceLabsLauncher } = require('@web/test-runner-saucelabs');

const config = {
  nodeResolve: true,
  coverageConfig: {
    include: ['**/src/*'],
    threshold: {
      statements: 100,
      branches: 57,
      functions: 100,
      lines: 100
    }
  }
};

if (process.env.TEST_ENV === 'sauce') {
  const sauceLabsLauncher = createSauceLabsLauncher({
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY
  });

  const sharedCapabilities = {
    'sauce:options': {
      name: 'vaadin-select unit tests',
      build: `${process.env.GITHUB_REF || 'local'} build ${process.env.GITHUB_RUN_NUMBER || ''}`
    }
  };

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
