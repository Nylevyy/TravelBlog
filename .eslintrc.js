module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    "plugin:react/recommended",
    'plugin:sonarjs/recommended',
    'eslint:recommended',
  ],
  plugins: ['prettier', 'sonarjs'],
  globals: {
    document: true,
    window: true,
    fetch: false,
    localStorage: true,
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
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'linebreak-style': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
      },
    ],
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'no-bitwise': [
      'error',
      {
        allow: ['~'],
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
    'react/function-component-definition': [2, {
      'namedComponents': 'arrow-function',
    }],
    camelcase: 0,
  },
};
