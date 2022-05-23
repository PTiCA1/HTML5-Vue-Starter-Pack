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
    'alpha-value-notation': null,
    "rule-empty-line-before": "always-multi-line",
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["function", "if", "each", "include", "mixin", "use"]
    }],
    "function-no-unknown": [true, {
      "ignoreFunctions": ["percentage", "math.div"]
    }]
  },
  syntax: 'scss',
}
