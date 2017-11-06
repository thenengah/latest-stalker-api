const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
  entry: {
    vendor: [
      path.join(__dirname, '/vendor.js')
    ]
  },
  output: {
    library: "[name]",
    filename: "[name]-[hash].js",
    path: path.resolve(__dirname, '../../bundle')
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]",
      context: __dirname + 'webpack',
      path: path.join(__dirname, '..', '..', "bundle", "[name]-manifest.json")
    }),
    new AssetsPlugin({
      fullPath: false,
      filename: "./bundle/vendor-assets.json"
    })
  ]
};
