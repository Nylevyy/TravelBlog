// const path = require('path');

module.exports = {
  extends: [
    'airbnb',
    'plugin:sonarjs/recommended',
    'eslint:recommended',
  ],
  plugins: ['sonarjs'],
  globals: {
    document: true,
    window: true,
    fetch: false,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  rules: {
    'no-plusplus': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'linebreak-style': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
      }
    ],
    'react/require-default-props': 0,
    "no-bitwise": [
      "error", 
      { 
        "allow": ["~"],
      },
    ],
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        comments: 80,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-indent': ['warn', 2],
    camelcase: 0,
  },
};
