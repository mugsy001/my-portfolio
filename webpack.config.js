const path = require('path');

//CREATE CONFIG OPTIONS
module.exports = {
  //WHERE WEBPACK STARTS LOOKING FOR CODE
  entry: './js/main.js',
  output: { //WHERE TO PUT OUTPUT
    //USE PATH TO FIND CUR DIR
    //AND INSIDE THIS TO FIND DIR DIST
    //WILL FIND ALL DEPENDENCIES
    //AND JS CODE AND BUNDLE IN "BUNDLE.JS"
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  //TO TELL HOW TO PACKAGE THIS CODE
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }
    }]
  }
}
