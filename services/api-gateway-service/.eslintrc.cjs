module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks', 'sort-destructure-keys'],
  rules: {
    '@next/next/no-html-link-for-pages': 0,
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
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'default-case': 1,
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'react/destructuring-assignment': 1,
    'react/jsx-sort-props': 1,
    'react/jsx-uses-react': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 2,
    'sort-destructure-keys/sort-destructure-keys': 1,
  },
  settings: { react: { pragma: 'React', version: 'detect' } },
};
