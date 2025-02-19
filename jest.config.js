module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transforms JS and JSX files using Babel
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/', // Ensures `axios` is transformed, ignores other node_modules
    ],
    moduleNameMapper: {
      '^react-router-dom$': '<rootDir>/node_modules/react-router-dom', // Maps `react-router-dom` to its location
    },
  };