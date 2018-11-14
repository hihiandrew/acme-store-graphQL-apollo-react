const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/index.js'],
  mode: 'development',
  output: {
    path: path.join(__dirname, '/public'), //where we want the output to be placed
    filename: 'bundle.js', //the name of the file that will contain our output
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
};
