module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(axios|axios-utils)/)'
    ],
    moduleNameMapper: {
      '^react-router-dom$': '<rootDir>/node_modules/react-router-dom', // Maps `react-router-dom` to its location
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node']
  };