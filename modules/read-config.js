const path = require('path');
const cwd = process.cwd();
const packageJSONPath = path.resolve(cwd, 'package.json')
const configKey = 'talentui';
const devServer = 'devServer';
const {cache} = require;

const defalutConfig = {
    pattern: 'not found',
    replace: '没有找到任何相关的配置'
}

module.exports = function(){
    // 通过require的方式读package.json比较省事儿，因为require有缓存，所以每次读之前先清掉require对应的缓存 
    if(cache[packageJSONPath]) delete cache[packageJSONPath]; 
    const packageJSONData = require(packageJSONPath);
    const talentUIObj = packageJSONData[configKey] || {};
    return Object.assign({}, defalutConfig, talentUIObj[devServer])
}