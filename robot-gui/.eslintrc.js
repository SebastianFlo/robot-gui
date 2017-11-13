// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-plusplus": 0,
    "no-restricted-syntax": ["off", "ForInStatement"],
    "max-len": 0,
    "newline-per-chained-call": 0,
    "no-undef": 1,
    "no-param-reassign": [2, {"props": false}],
    "no-underscore-dangle": 0,
    "no-unused-vars": 1,
    "space-in-parens": 1,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "comma-dangle": 1
  }
}
