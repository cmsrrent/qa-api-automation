module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testTimeout: 20000,
  maxWorkers: 1, // Sequential execution prevents race conditions against public shared API
  testMatch: ['**/tests/**/*.spec.js'],
  transform: {
    '^.+\\.js$': [
      'babel-jest',
      { plugins: ['@babel/plugin-transform-modules-commonjs'] },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!@faker-js/faker/)'],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Restful Booker API Test Automation Report',
        outputPath: 'reports/test-report.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
        theme: 'darkTheme',
      },
    ],
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/config/**',
  ],
};
