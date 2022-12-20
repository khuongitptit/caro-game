module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/vue3-essential', // This option doesn't impose formatting rules
    // 'plugin:vue/vue3-strongly-recommended', // This option imposes formatting rules on your code to improve readability
  ],
  rules: {
    'vue/multi-word-component-names': 0,
  },
};
