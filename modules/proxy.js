const express = require('express');
const router = express.Router();
const proxy = require('http-proxy-middleware');
const reg = new RegExp();
const matchedMark = 'talentui-dev-server-url-matched';
reg.compile(/\/ux\/upaas-portal\/release\/dist\/((?:\w+\/)*)(\w+(?:-[a-z]+)*)+-(?:\w+)(\.chunk)?(?:\.min)?(\.\w{2,4})/);

router.use(reg, proxy({
            target: 'http://localhost:3000', 
            changeOrigin: true, 
            pathRewrite: function(path, req){
                return reg.exec(path).slice(1).join('')
            }
        }
    )
)

router.use('*', proxy({
    target: 'http://60.28.207.67',
    changeOrigin: false
}))

module.exports = router;