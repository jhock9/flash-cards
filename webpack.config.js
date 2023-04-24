const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/app.js',
  mode: 'development',
  output: {
    clean: true,
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } } },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
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
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      favicon: path.resolve(__dirname, 'favicon-32x32.png'),
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'src/main.css', to: './' },
        { from: './favicon-32x32.png', to: './' },
      ],
    }),
    new Dotenv({
      systemvars: true, // Load system environment variables as well
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    //     GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
    //     GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
    //   },
    // }),
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
