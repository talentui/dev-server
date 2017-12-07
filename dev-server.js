const path = require('path')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const proxy = require('./modules/proxy');
const api = require('./modules/api');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', express.static(path.join(__dirname, 'dist/')));
app.use('/api', api);

app.use(proxy);

app.use((req, res, next) => {
    res.status(404).send('你要的文件，本地服务没找到，远程地址也没找到，那咋办？');
})

app.listen(80, () => console.log('server start on port 80'));