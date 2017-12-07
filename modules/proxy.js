const express = require('express');
const router = express.Router();
const proxy = require('http-proxy-middleware');
const upaasReg = /\/ux\/upaas-portal\/release\/dist\/((?:\w+\/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-\w+)?(\.chunk)?(?:\.min)?(\.\w{2,4})/;
const meetingReg = /\/ux\/imeeting\/release\/dist\/((?:\w+\/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-\w+)?(\.chunk)?(?:\.min)?(\.\w{2,4})/;
const honorReg = /\/ux\/honor-center\/release\/dist\/((?:\w+\/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-\w+)?(\.chunk)?(?:\.min)?(\.\w{2,4})/;
const dllReg = /^\/ux\/upaas\/(?:@\w+\/[\w-]+)\/release\/dist\/([a-z-]+)-(?:\d+\.\d+\.\d+)(?:\.min)?(\.js)/;
const matchedMark = 'talentui-dev-server-url-matched';
const localHost = "http://localhost:3000";


function proxyFactory(router, reg, target, customPath){
    router.use(reg, proxy({
        target,
        changeOrigin: true,
        pathRewrite: function(path, req){
            if(customPath){
                if(typeof(customPath) === typeof(Function)){
                    return customPath(path, reg)
                }
                return customPath;
            }
            return reg.exec(path).slice(1).join('');
        }
    }))
}

proxyFactory(router, upaasReg, localHost);
proxyFactory(router, meetingReg, localHost);
proxyFactory(router, honorReg, localHost);
proxyFactory(router, dllReg, localHost);


router.use('*', proxy({
    target: 'http://60.28.207.67',
    changeOrigin: false
}))

module.exports = router;