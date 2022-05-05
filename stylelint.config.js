module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss'
  ],
  // https://stylelint.io/user-guide/configuration
  rules: {
    "max-empty-lines": 2,
    "number-leading-zero": "never",
    'no-empty-source': null,
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["function", "if", "each", "include", "mixin"]
    }]
  },
  syntax: 'scss',
}
