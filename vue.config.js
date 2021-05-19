const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const localConfig = {
  // publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/",
  lintOnSave: false,
  devServer: {},
  configureWebpack: {
    plugins: [
      // Copy Cesium Assets, Widgets, and Workers to a static directory
      new CopyWebpackPlugin({
        patterns: [
          { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' },
          { from: 'node_modules/cesium/Build/Cesium/ThirdParty', to: 'ThirdParty' },
          { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' },
          { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' },
        ],
      }),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify('/'),
      }),
    ],
    resolve: {},
  },
};
module.exports = localConfig;
