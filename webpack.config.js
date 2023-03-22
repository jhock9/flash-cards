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
    // publicPath: 'dist/',
    // sourceMapFilename: 'bundle.js.map'
  },
  // devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: {loader: 'babel-loader', options: { presets: ['@babel/preset-env']}}},
      { test: /\.css$/, use: ['style-loader', 'css-loader']},
      { test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource', generator: { filename: 'assets/[name][ext]' }},
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource', generator: { filename: 'assets/[name][ext]' }},
      // { mimetype: 'application/javascript', type: 'js',}, 
    ]
  },
  resolve: {
    fallback: {
      "os": false 
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      favicon: './favicon-32x32.png'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'src/main.css', to: './' }
      ],
    }),
    new webpack.IgnorePlugin({
      checkResource: (resource) => {
        return resource.startsWith('fs') && process.env.NODE_ENV === 'production';
      },
    }),
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      systemvars: true
    }),
  ],
  devServer: {
    static: path.resolve('./'),
    open: true,
    port: 3003,
    // historyApiFallback: true,
    // devMiddleware: {
    //   mimeTypes: { 
    //     "js": "application/javascript",
    //     "html": "text/html",
    //     "css": "text/css",
    //     "png": "image/png"
    //   },
    // },
  },
}