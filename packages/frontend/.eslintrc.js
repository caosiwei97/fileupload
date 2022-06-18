module.exports = {
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/vue3-strongly-recommended', '../../.eslintrc.js'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
