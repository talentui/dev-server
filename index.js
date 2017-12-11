#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sudo  = require('sudo-prompt');

//把配置文件写入到用户目录
const initData = require('./modules/data.json');
const constants = require('./modules/constants');
const configPath = path.join(constants.homePath, constants.configFile);

if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(initData, null, 4), 'utf8')
}

const options = {
    name: 'TalentUI Dev Server'
}

sudo.exec(`node ${__dirname}/dev-server.js`, options, function(error, stdout, stderr) {
    if(error) throw error;
    console.log('no error')
    console.log(stdout)
})