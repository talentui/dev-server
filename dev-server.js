const path = require('path')
const express = require('express');
const app = express();

const proxy = require('./modules/proxy');

app.use('/', express.static('dist'));

app.use(proxy);

app.use((req,res,next) => {
    res.status(404).send('你要的文件，本地服务没找到，远程地址也没找到，那咋办？');
})

app.listen(80, () => console.log('server start on port 80'));