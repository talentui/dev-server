const path = require('path');
const fs = require('fs');
const constants = require('./constants');
const configPath = path.resolve(constants.homePath, constants.configFile);

function readConfigData(path){
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

const data = {
    config: readConfigData(configPath),
    changed: false
}

module.exports = {
    markConfigChange: function(){
        data.changed = true;
    },
    getConfig: function(){
        if(data.changed){
            data.config = readConfigData(configPath);
        }
        return data.config
    }
}