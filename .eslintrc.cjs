module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', 'prettier'],
  plugins: ['import'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    // Disabled to avoid errors in singleton pattern implementation.
    'no-use-before-define': 'off',
    // Disabled to avoid errors in private constructor implementation.
    'no-useless-constructor': 'off',
    // For eslint-plugin-vue.
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/no-v-for-template-key-on-child': 'warn',
    'vue/no-v-for-template-key': 'off',
    // For eslint-plugin-import.
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
  },
};
