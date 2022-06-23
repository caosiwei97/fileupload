module.exports = {
  transform: {
    // .vue文 件用 vue-jest 处理
    '^.+\\.vue$': 'vue-jest',
    // .js 或者 jsx 用 babel-jest处理 (支持 import)
    '^.+\\.jsx?$': 'babel-jest',
    //.ts文件用ts-jest处理
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src$1',
  },
}
