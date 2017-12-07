const express = require('express');
const router = express.Router();
const httpProxyMiddleware = require('http-proxy-middleware');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

const findMatchConfig = require('./findMatchConfig');

function rewritePath(path, regStr, req) {
    let reg = new RegExp(regStr);
    req.url = reg.exec(path).slice(1).join('');
}


router.use('*', (req, res, next) => {
    let { baseUrl } = req;
    let matched = findMatchConfig(baseUrl, req);
    if (matched) {
        switch (matched.type) {
            case 'product': {
                let { index, product: { port, configs } } = matched;
                rewritePath(baseUrl, configs[index]['reg'], req);
                proxy.web(req, res, {
                    target: `http://localhost:${port}`,
                    changeOrigin: true
                }, function (err) {
                    console.log(err);
                })
                break;
            }
            case 'special': {
                let { special: { port, reg } } = matched;
                rewritePath(baseUrl, reg, req);
                proxy.web(req, res, {
                    target: `http://127.0.0.1:${port}`,
                    changeOrigin: true
                })
                break;
            }
            case 'notfound': {
                next();
            }
        }
    }
})

router.use('*', httpProxyMiddleware({
    target: 'http://60.28.207.67',
    changeOrigin: false
}))

module.exports = router;


// const upaasReg = /\/ux\/upaas-portal\/release\/dist\/((?:\w+\/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-\w+)?(\.chunk)?(?:\.min)?(\.\w{2,4})/;
// const meetingReg = /\/ux\/imeeting\/release\/dist\/((?:\w+\/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-\w+)?(\.chunk)?(?:\.min)?(\.\w{2,4})/;
// const honorReg = /\/ux\/honor-center\/release\/dist\/((?:\w+\/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-\w+)?(\.chunk)?(?:\.min)?(\.\w{2,4})/;
// const dllReg = /^\/ux\/upaas\/(?:@\w+\/[\w-]+)\/release\/dist\/([a-z-]+)-(?:\d+\.\d+\.\d+)(?:\.min)?(\.js)/;
// const matchedMark = 'talentui-dev-server-url-matched';
// const localHost = "http://localhost:3000";

// function proxyFactory(router, reg, target, customPath){
//     router.use(reg, httpProxyMiddleware({
//         target,
//         changeOrigin: true,
//         pathRewrite: function(path, req){
//             if(customPath){
//                 if(typeof(customPath) === typeof(Function)){
//                     return customPath(path, reg)
//                 }
//                 return customPath;
//             }
//             return reg.exec(path).slice(1).join('');
//         }
//     }))
// }

// proxyFactory(router, upaasReg, localHost);
// proxyFactory(router, meetingReg, localHost);
// proxyFactory(router, honorReg, localHost);
// proxyFactory(router, dllReg, localHost);