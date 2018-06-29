const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const constants = require('./constants')
const { markConfigChange } = require('./getConfig')

router.get('/get', (req, res, next) => {
    let config = JSON.parse(fs.readFileSync(path.resolve(constants.homePath, constants.configFile), 'utf8'));
    res.json(config);
})

router.get('/download/cert', (req, res, next) => {
    res.download(path.resolve(__dirname, '../ssl/beisen.com.root.crt'))
});

router.post('/save', (req, res, next) => {
    let { body } = req;
    fs.writeFile(path.resolve(constants.homePath, constants.configFile), JSON.stringify(body, null, 4), err => {
        if (err) {
            res.json({ status: '500' })
        } else {
            markConfigChange();
            res.json({ status: '200' })
        }
    })

})

module.exports = router;