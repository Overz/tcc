module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      ['@babel/plugin-transform-runtime'],
      [
        'babel-plugin-root-import',
        {
          rootPathSuffix: 'src',
          rootPathPrefix: '~/',
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
