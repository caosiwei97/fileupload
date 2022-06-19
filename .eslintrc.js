module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  // 配置环境变量
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },

  // 配置规则
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error', // 不符合prettier格式化规则的都标记为错误
    '@typescript-eslint/no-empty-function': 'off',
  },
}
