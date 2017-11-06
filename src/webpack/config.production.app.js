const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
  entry: {
    website: [
      './src/client'
    ]
  },
  output: {
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
    }, {
      test: /\.(scss|css)$/i,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          query: {
            localIdentName: '[hash:10]',
            modules: true
          }
        }, {
          loader: 'postcss-loader'
        }, {
          loader: 'sass-loader'
        }]
      })
    }, {
      test: /\.(png|jpg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '/[name]-[hash].[ext]'
        }
      }
    }, {
      test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'base64-font-loader'
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]-[hash].css'
    }),
    new webpack.DllReferencePlugin({
      context: __dirname + 'webpack',
      manifest: require("../../bundle/vendor-manifest.json")
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    }),
    new AssetsPlugin({
      fullPath: false,
      filename: "./bundle/app-assets.json"
    })
  ]
};
