module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-unused-vars': 'off',
    'space-before-function-paren': ['error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true
      }
    ],
    indent: ['error',
      2
    ],
    'linebreak-style': ['error', 'unix'
    ],
    quotes: ['error', 'single'
    ],
    semi: ['error', 'always'
    ],
    'import/newline-after-import': ['error',
      {
        count: 1
      }
    ]
  }
};