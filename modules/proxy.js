const express = require("express");
const router = express.Router();
const httpProxyMiddleware = require("http-proxy-middleware");
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});
const url = require("url");
const fs = require("fs");
const path = require("path");
const { getConfig } = require("./getConfig");
const { socketio, roomLog, msgLog, responseType } = require("./constants");
const createLog = require("./createLog");

const findMatchConfig = require("./findMatchConfig");

function rewritePath(regx, req) {
    return regx
        .exec(req.baseUrl)
        .slice(1)
        .join("");
}

router.use("*", (req, res, next) => {
    let io = req.app.get(socketio).to(roomLog);
    let result = findMatchConfig(req);
    io.emit(msgLog, createLog(result));
    if (result.responseType === responseType.local) {
        let { responsePath } = result;
        if (fs.existsSync(responsePath)) {
            res.sendFile(responsePath);
            //如果文件不存在则返回错误信息
        } else {
            res.json({
                message: `你指定的本地文件${directMatch}不存在`
            });
        }
    } else {
        req.url = result.responsePath;
        proxy.web(
            req,
            res,
            {
                target: result.responseTarget,
                changeOrigin: result.changeOrigin
            },
            function(err) {
                if (err) {
                    res.json({
                        code: 400,
                        err
                    });
                }
            }
        );
    }
});

module.exports = router;
