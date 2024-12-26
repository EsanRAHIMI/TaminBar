const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
      }),
      new Dotenv({
        path: './.env',
        systemvars: true,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode || 'development'),
      }),
    ],
    devServer: isDevelopment
      ? {
          static: './dist',
          port: 3000,
          host: '0.0.0.0',
          allowedHosts: ['taminbar.ir'],
          hot: true,
        }
      : undefined, // Disable devServer in production
  };
};
