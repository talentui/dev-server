#!/usr/bin/env node
const sudo  = require('sudo-prompt');

const options = {
    name: 'TalentUI Dev Server'
}

sudo.exec(`node ${__dirname}/dev-server.js`, options, function(error, stdout, stderr) {
    if(error) throw error;
    console.log('no error')
    console.log(stdout)
})