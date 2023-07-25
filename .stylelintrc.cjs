module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  ignoreFiles: ['**/node_modules/**'],
  overrides: [
    {
      customSyntax: 'postcss-scss',
      files: ['**/*.scss'],
    },
    {
      customSyntax: 'postcss-html',
      files: ['**/*.vue'],
    },
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
  },
};
