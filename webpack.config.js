const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('node:path/win32');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      { test: /\.css$/, use: ['style-loader', 'css-loader']},
      { test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      { test: /\.(png|svg|jpg|jpeg|gif)$/, type: 'asset/resource'},
      { test: /\.(woff|woff2|eot|ttf|otf)$/, type: 'asset/resource'},
    ]
  },
  
  mode: 'development',

  devServer: {
    static: path.resolve('./'),
    open: true,
    port: 3003,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.IgnorePlugin({
      checkResource: (resource) => {
        return resource.startsWith('fs') && process.env.NODE_ENV === 'production';
      },
    }),
    // new Dotenv({
    //   path: '.env',
    // })
  ],

  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  }
}