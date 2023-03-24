const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      MY_GLOBAL_VARIABLE: JSON.stringify('some value'),
    }),
  ],
  // ... другие настройки webpack
};

new webpack.DefinePlugin({
    'BASE_URL': JSON.stringify('https://apiurlgoeshere.com/')
});