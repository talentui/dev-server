const fs = require('fs');
const path =require('path');
const webpack = require('webpack');
const constants = require('./const');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);
const cwd = process.cwd();
const contants = require('./const');

function buildCallback(err, {compilation}){
    if(err) return  console.log(err);
    let {assets,entrypoints: {main: {chunks}}} = compilation;
    let cssFiles = require('./get-css')(assets);
    let jsFiles = require('./get-js')(chunks)
    if(fs.existsSync(path.resolve(cwd, constants.targetTemplate))) return;
    require('./write-index-page')(cssFiles, jsFiles);
}

if(process.env.NODE_ENV===constants.prod){
    compiler.run(buildCallback);
}
else{
    compiler.watch({}, buildCallback);
    process.on('beforeExit', () => {
        compiler.close();
    });
}
