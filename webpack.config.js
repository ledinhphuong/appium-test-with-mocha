const webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/session.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false,
        semicolons: true
      },
      sourceMap: false,
      beautify: false,
      mangle: true
    })
  ]
};
