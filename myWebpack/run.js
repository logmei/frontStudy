var myWebpack = require("./lib/webpack");
var config = require('./webpack.config.js');
var webpack = new myWebpack(config)
webpack.init();