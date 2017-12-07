const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const constants = require('./constants')

router.get('/get', (req, res, next) => {
    let config = JSON.parse(fs.readFileSync(path.resolve(constants.homePath, constants.configFile), 'utf8'));
    res.json(config);
})

router.post('/save', (req, res, next) => {
    let { body } = req;
    fs.writeFile(path.resolve(constants.homePath, constants.configFile), JSON.stringify(body, null, 4), err => {
        if (err) {
            res.json({ status: '500' })
        } else {
            res.json({ status: '200' })
        }
    })

})

module.exports = router;