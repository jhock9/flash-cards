const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv').config().parsed;

module.exports = {
  entry: {
    app: './src/app.js',
    login: './src/js/login.js',
    dashboard: './src/js/dashboard/dashboard.js',
    flashcards: './src/js/flashcards.js',
  },
  mode: 'development',
  output: {
    clean: true,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } } },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource', generator: { filename: 'assets/[name][ext]' } },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource', generator: { filename: 'assets/[name][ext]' } },
    ],
  },
  resolve: {
    fallback: {
      os: false,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/login.html',
      filename: 'login.html',
      inject: 'body',
      favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/flashcards.html',
      filename: 'flashcards.html',
      inject: 'body',
      favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'src/css/common.css', to: './' },
        { from: 'src/css/login.css', to: './' },
        { from: 'src/css/flashcards.css', to: './' },
        { from: 'src/assets/favicon.ico', to: './' },
      ],
    }),
    new Dotenv({
      systemvars: true,
    }),
    new webpack.IgnorePlugin({
      checkResource: (resource) => resource.startsWith('fs') && process.env.NODE_ENV === 'production',
    }),
  ],
  devServer: {
    static: path.resolve('./'),
    open: true,
    port: 3003,
    proxy: {
      '/api': 'http://localhost:3003',
    },
  },
};
