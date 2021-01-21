const webpack = require('webpack');
const path = require('path');

const buildPath = path.resolve(__dirname, 'build');

const server = {
  entry: './src/server/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'server.js',
    path: buildPath,
  },
  target: 'node',
};

const client = {
  entry: './src/client/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'client.js',
    path: buildPath,
  },
};

module.exports = [server, client];
