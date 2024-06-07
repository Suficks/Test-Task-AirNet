import path from 'path';

export default {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "C:\\Users\\vdo-s\\AppData\\Local\\Temp\\jest",

  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules'],
  modulePaths: ['<rootDir>src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
  rootDir: '../../',
  coverageProvider: 'babel',
  testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
  moduleNameMapper: {
    '\\.s?css$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>src/$1',
  }
}