const path = require('path');

module.exports = {
  mode: "development", // "production" | "development" | "none"
  entry: './src/blackjack-web.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000
  },
};