const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    target: 'web',
    mode: 'production',
    entry: './src/index.js',
    devtool: 'inline-source-map',
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
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-syntax-import-assertions']
            },
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(ico|png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // Path to your source HTML file
        filename: 'index.html', // Output file name
        inject: 'head',
        scriptLoading: 'blocking',
      }),
    ],
};

module.exports = config;
