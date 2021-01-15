/* eslint-disable @typescript-eslint/no-var-requires */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    // eslint-disable-next-line prettier/prettier
    prefix: '<rootDir>/src/'}),
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom:[
    '<rootDir>/src/modules/**/services/*.ts'
  
  ],
  coverageReporters:[
    "text-summary",
    "lcov",
  ]
};
