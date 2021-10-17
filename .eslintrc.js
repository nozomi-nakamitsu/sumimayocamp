module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    camelcase: 'off',
    'no-console': [1, { allow: ['error'] }],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
  },
}
