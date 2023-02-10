const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    sourceMapFilename: 'bundle.js.map',
    clean: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, options: { presets: ['@babel/preset-env']}},
      { test: /\.css$/, use: ['style-loader', 'css-loader']},
      { test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      { test: /\.(png|svg|jpg|jpeg|gif)$/, type: 'asset/resource', use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/',
          publicPath: 'assets/'
        }
      }]},
      { test: /\.(woff|woff2|eot|ttf|otf)$/, type: 'asset/resource', use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/',
          publicPath: 'assets/'
        }
      }]},
    ]
  },
  
  mode: 'production', // process.env.NODE_ENV,

  devServer: {
    static: path.resolve('./'),
    open: true,
    port: 3003,
  },

  // devServer: {
  //   contentBase: path.resolve(__dirname, 'src'),
  //   open: true,
  //   port: 3003,
  // },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'src/main.css', to: './' },
        { from: './favicon-32x32.png', to: './' },
        { from: './favicon.ico', to: './' },
      ],
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
    // new webpack.IgnorePlugin({
    //   checkResource: (resource) => {
    //     return resource.startsWith('fs') && process.env.NODE_ENV === 'production';
    //   },
    // }),
    // new Dotenv({
    //   path: '.env',
    //   safe: true
    // })
  ],

  resolve: {
    fallback: {
      "os": false,
      "path": require.resolve("path-browserify")
    }
  }
}