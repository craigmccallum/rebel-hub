/** @type {import('jest').Config} */
module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.env.cjs'],
};
