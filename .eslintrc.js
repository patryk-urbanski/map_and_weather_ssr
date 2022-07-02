module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  globals: {
    window: true,
    document: true,
    process: true,
    cy: true,
    Cypress: true,
  },
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'react/no-unescaped-entities': 'off', // Disable prop-types as we use TypeScript for type checking
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['.storybook/**', '**/*.stories.js'],
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: ['/^react/', 'module', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    'prettier/prettier': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier', 'import', 'import-helpers'],
};
