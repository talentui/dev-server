const fs = require('fs');
const path =require('path');
const webpack = require('webpack');
const constants = require('./const');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);
const cwd = process.cwd();

compiler.watch({},(err, {compilation}) => {
    if(err) return  console.log(err);
    let {assets,entrypoints: {main: {chunks}}} = compilation;
    let cssFiles = require('./get-css')(assets);
    let jsFiles = require('./get-js')(chunks)
    if(fs.existsSync(path.resolve(cwd, constants.targetTemplate))) return;
    require('./write-index-page')(cssFiles, jsFiles);
});

process.on('beforeExit', () => {
    compiler.close(function(){

    });
});