module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
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
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
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
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'linebreak-style': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        allowChildren: true,
      },
    ],
    'no-bitwise': [
      'error',
      {
        allow: ['~'],
      },
    ],
    'max-len': [
      'warn',
      {
        code: 120,
        tabWidth: 2,
        comments: 120,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-indent': ['warn', 2],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/jsx-sort-props': [
      'warn',
      {
        noSortAlphabetically: false,
        callbacksLast: true,
        multiline: 'last',
        reservedFirst: ['key'],
      },
    ],
  },
  overrides: [
    // allow mutable state in @redux/toolkit
    {
      files: ['src/**/*slice.{js,ts}'],
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
    {
      files: ['*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['prettier', '@typescript-eslint'],
      extends: [
        'airbnb-typescript',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        'import/extensions': 0,
      },
    },
  ],
};
