module.exports = {
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^#src/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.env.js'],
};
