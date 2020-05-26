function namingConvention({ isTsx = false }) {
  // Docs on naming convention rule:
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md


  const rules = [
    {
      'selector': 'default',
      'format': ['camelCase'],
      'leadingUnderscore': 'allow',
    },
    {
      'selector': 'variable',
      'format': ['camelCase', 'UPPER_CASE', 'PascalCase'],
      'leadingUnderscore': 'allow',
    },
    {
      'selector': 'parameter', // parameter or _parameter
      'format': ['camelCase'],
      'leadingUnderscore': 'allow',
    },
    {
      'selector': 'memberLike', // private _member
      'modifiers': ['private'],
      'format': ['camelCase'],
      'leadingUnderscore': 'require',
    },
    {
      'selector': 'method', // don't force _ on private methods
      'modifiers': ['private'],
      'format': ['camelCase'],
      'leadingUnderscore': 'allow',
    },
    {
      'selector': 'memberLike', // private static _Member
      'modifiers': ['private', 'static'],
      'format': ['PascalCase'],
      'leadingUnderscore': 'require',
    },
    {
      'selector': 'typeLike', // class MyClass
      'format': ['PascalCase'],
    },
    {
      'selector': 'typeParameter', // class MyClass<TGeneric>
      'format': ['PascalCase'],
      'prefix': ['T'],
    },
    {
      'selector': 'interface', // IFooBar or FooBarVM
      'format': ['PascalCase'],
      'custom': {
        regex: '^I|VM$',
        match: true,
      },
    },
  ]

  const relaxedPropertiesRule = {
    'selector': 'property',
    'format': null,
    'custom': {
      regex: '^_?[-_a-zA-Z0-9]+$',
      match: true,
    },
  } // why? in tsx files we often find props like __html or 'Content-Type' which we want to allow

  if (isTsx)
    rules.push(relaxedPropertiesRule)

  return rules
}

module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': [
      './tsconfig.json',
      './test/tsconfig.json',
    ],
    'sourceType': 'module',
    'ecmaVersion': 2020,
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'extends': [
    'eslint:recommended',
//    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  'rules': {
    'semi': ['warn', 'never'],
    'quotes': ['warn', 'single'],
    'no-console': 'off',

    '@typescript-eslint/ban-ts-ignore': 'off',
    'no-global-assign': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off', //  Since most modern TypeScript doesn’t use var, this rule is generally discouraged and is kept around for legacy purposes. https://palantir.github.io/tslint/rules/no-use-before-declare/

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],

 //   'react/jsx-uses-react': 'error',
 //   'react/jsx-uses-vars': 'error',

    'comma-dangle': ['warn', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'only-multiline',
    }],

    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'comma',
        'requireLast': true,
      },
      'singleline': {
        'delimiter': 'comma',
        'requireLast': false,
      },
    }],

    '@typescript-eslint/naming-convention': [
      'error',
      ...namingConvention({ isTsx: false }),
    ],


  },
  'overrides': [
    {
      'files': ['*.test.ts'],
      'rules': {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-undef': 'off',
      },
    },
    {
      'files': ['*.tsx'],
      'rules': {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          ...namingConvention({ isTsx: true }),
        ],
      },
    },
    {
      'files': ['jest.config.js'],
      'rules': {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
}

