module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import', 'jsx-a11y'],
  rules: {
    'prettier/prettier': 'warn',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.ts'] }],
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/no-unresolved': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-unused-expressions': 'off',
    'react/prop-types': 'off',
    // 'react/forbid-prop-types': 'off',
    'import/order': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'arrow-body-style': 'warn',
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        // EXEMPLO 1
        //
        rootPathSuffix: 'src',
        rootPathPrefix: '~/',
        //
        // EXEMPLO 2
        // paths: [
        //   {
        //     rootPathSuffix: './src/components',
        //     rootPathPrefix: '@components/',
        //   },
        //   {
        //     rootPathSuffix: './src/routes',
        //     rootPathPrefix: '@routes',
        //   },
        //   {
        //     rootPathSuffix: './src/hooks',
        //     rootPathPrefix: '@hooks/',
        //   },
        //   {
        //     rootPathSuffix: './src/constants',
        //     rootPathPrefix: '@constants/',
        //   },
        //   {
        //     rootPathSuffix: './src/contexts',
        //     rootPathPrefix: '@contexts/',
        //   },
        //   {
        //     rootPathSuffix: './src/img',
        //     rootPathPrefix: '@img/',
        //   },
        //   {
        //     rootPathSuffix: './src/screens',
        //     rootPathPrefix: '@screens/',
        //   },
        //   {
        //     rootPathSuffix: './src/services',
        //     rootPathPrefix: '@services/',
        //   },
        //   {
        //     rootPathSuffix: './src/utils',
        //     rootPathPrefix: '@utils/',
        //   },
        // ],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
