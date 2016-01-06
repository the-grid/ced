var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    demo: './demo/demo.js',
    ced: ['./src/index.js'],
  },
  plugins: [],
  output: {
    path: './lib',
    filename: '[name].js',
    library: 'TheGridCodeEd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, 
        loader: 'babel-loader', 
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'demo')
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
