module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"]
  },
  linebreak: ['error', 'windows'],
  extends: [
    "some-other-config-you-use",
    "prettier"
  ]
};
