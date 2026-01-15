module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@core': './src/core',
            '@screens': './src/screens',
            '@api': './src/services/api',
            '@fonts': './assets/fonts',
            '@auth': './src/screens/auth',
            '@profile': './src/screens/profile',
            '@translations': './src/translations',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
