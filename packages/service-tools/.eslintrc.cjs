module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  env: {
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'simple-import-sort',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/consistent-type-exports': [
      1,
      {
        prefer: 'type-exports',
        fixStyle: 'inline-type-exports',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      1,
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-empty-interface': 1,
    '@typescript-eslint/no-unnecessary-condition': 2,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'default-case': 1,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
