const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    target: 'web',
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve('dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.html?$/,
          use: 'html-loader',
        },
        {
          test: /\.js?$/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // Path to your source HTML file
        filename: 'dist/index.html', // Output file name
      }),
    ],
};

module.exports = config;
