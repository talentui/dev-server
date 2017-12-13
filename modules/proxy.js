const express = require("express");
const router = express.Router();
const httpProxyMiddleware = require("http-proxy-middleware");
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});
const parseDeirectMatch = require("./parseDeirectMatch");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { getConfig } = require("./getConfig");

const findMatchConfig = require("./findMatchConfig");

function rewritePath(regx, req) {
    return regx
        .exec(req.baseUrl)
        .slice(1)
        .join("");
}

router.use("*", (req, res, next) => {
    let result = findMatchConfig(req);
    let { matched, type } = result;
    switch (type) {
        case "talentui": {
            let { regx, port } = matched;
            req.url = rewritePath(regx, req);
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
            let isRemote = false;
            let changeOrigin = true;
            let { port, regx, directMatch } = matched;
            let target = `http://127.0.0.1:${port || 80}`;
            //用户指定了要返回的文件的地址，如果有协议的标识，请求远端，如果没有协议标识，直接走本地文件
            if (directMatch) {
                let isRemote = directMatch.indexOf("://") !== -1;
                //是否带有协议标识
                if (isRemote) {
                    let config = getConfig();
                    let { protocol, path, hostname } = url.parse(directMatch);
                    if (hostname === config.target.name) {
                        //如果配置远程地址和代理远端的地址一样的，话使用远端的ip地址，防止进入死循环
                        hostname = config.target.ip;
                    }
                    target = `${protocol}//${hostname}`;
                    //如果指定了直配地址，那么origin不能被修改，否则可能会被目标服务器拒绝
                    changeOrigin = false; 
                    // 修改request的地址给proxy模块使用
                    req.url = path;
                    //当直配不是远端地址的时候，从本地电脑找文件
                } else {
                    let filePath = path.resolve("/", directMatch);
                    // 如果本地文件存在的话 直接返回本地文件
                    if (fs.existsSync(filePath)) {
                        res.sendFile(filePath);
                    //如果文件不存在则返回错误信息
                    } else {
                        res.json({
                            message: `你指定的本地文件${directMatch}不存在`
                        });
                    }
                    //res已经响应，中断此方法的执行。
                    return;
                }
            } else {
                req.url = rewritePath(regx, req);
            }
            proxy.web(req, res, {
                target,
                changeOrigin
            });
            break;
        }
        case "notfound": {
            next();
        }
    }
});

//剩余的未被之前路由处理的进入Dev Server的请求，全部转发到config.target.name所对应的线上服务器上 ，
router.use(
    "*",
    httpProxyMiddleware({
        target: "http://60.28.207.67",
        changeOrigin: false
    })
);

module.exports = router;
