module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  // 配置环境变量
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true, // vue3 编译宏，可以直接使用 defineProps
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 配置规则
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error', // 不符合prettier格式化规则的都标记为错误
    '@typescript-eslint/no-empty-function': 'off',
    'vue/multi-word-component-names': 'off',
  },
}
