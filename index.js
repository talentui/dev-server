const sudo  = require('sudo-prompt');

const options = {
    name: 'root previlige is needed'
}

sudo.exec('node --inspect  dev-server.js', options, function(error, stdout, stderr) {
    if(error) throw error;
    console.log('no error')
    console.log(stdout)
})