const express = require("express");
const router = express.Router();
const httpProxyMiddleware = require("http-proxy-middleware");
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});

const findMatchConfig = require("./findMatchConfig");

function rewritePath(regx, req) {
    req.url = regx
        .exec(req.baseUrl)
        .slice(1)
        .join("");
}

router.use("*", (req, res, next) => {
    let { type, matched } = findMatchConfig(req);
    debugger;
    switch (type) {
        case "talentui": {
            let { regx, port } = matched;
            rewritePath(regx, req);
            proxy.web(
                req,
                res,
                {
                    target: `http://127.0.0.1:${port}`,
                    changeOrigin: true
                },
                function(err) {
                    switch (err.code) {
                        case "ECONNREFUSED": {
                            res.json({
                                code: 400,
                                message: `代理请求被拒绝，请确定本地项目已启动，地址http://${
                                    err.address
                                }:${err.port}`
                            });
                            break;
                        }
                        default: {
                            next();
                        }
                    }
                }
            );
            break;
        }
        case "special": {
            let { port, regx } = matched;
            rewritePath(regx, req);
            proxy.web(req, res, {
                target: `http://127.0.0.1:${port}`,
                changeOrigin: true
            });
            break;
        }
        case "notfound": {
            next();
        }
    }
});

router.use(
    "*",
    httpProxyMiddleware({
        target: "http://60.28.207.67",
        changeOrigin: false
    })
);

module.exports = router;

// const upaasReg = /\/ux\/upaas-portal\/release\/dist\/((?:\w+\/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-\w+)?(\.chunk)?(?:\.min)?(\.\w{2,4})/;
// const dllReg = /^\/ux\/upaas\/(?:@\w+\/[\w-]+)\/release\/dist\/([a-z-]+)-(?:\d+\.\d+\.\d+)(?:\.min)?(\.js)/;
