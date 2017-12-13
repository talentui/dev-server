const path = require('path')
const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const bodyParser = require('body-parser');

const proxy = require('./modules/proxy');
const api = require('./modules/api');

app.use(favicon(path.join(__dirname,'./favicon.ico')))

app.use('/', express.static(path.join(__dirname, 'dist/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/api', api);

app.use(proxy);

app.use((req, res, next) => {
    res.status(404).send('你要的文件，本地服务没找到，远程地址也没找到，那咋办？');
})

// app.listen(80, () => console.log('server start on port 80'));
http.createServer(app).listen(80);
https.createServer({
    key: fs.readFileSync(path.join(__dirname, './ssl/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './ssl/cert.pem')),
    passphrase: 'talentui'
}, app).listen(443);