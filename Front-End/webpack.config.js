/*
    ./webpack.config.js
*/
const path = require('path');

module.exports = {
  entry: './js/dataLoader.js',
  output: {
    path: path.resolve('js'),
    filename: 'dataLoaderProxy.js'
  },

  devServer: {
   historyApiFallback: true,
   proxy: {
     '/api': {
       target: 'http://localhost:8080/',
       pathRewrite: {"^/api" : ""},
       secure: false
     }
   },
   watchOptions: { aggregateTimeout: 300, poll: 1000 },
   headers: {
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
     "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
   }
 },
}
