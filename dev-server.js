const path = require("path");
const fs = require("fs");
const createLog = require("./modules/createLog");
const http = require("http");
const https = require("https");
const express = require("express");
const io = require("socket.io")();
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const constants = require("./modules/constants");

const app = express();

const proxy = require("./modules/proxy");
const api = require("./modules/api");

app.set(constants.socketio, io);
app.use(favicon(path.join(__dirname, "./favicon.ico")));
app.use("/", express.static(path.join(__dirname, "dist/")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", api);
app.use(proxy);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, "./ssl/key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "./ssl/cert.pem")),
        passphrase: "talentui"
    },
    app
);

httpServer.listen(80);
httpsServer.listen(443);

io.attach(httpServer);
io.attach(httpsServer);

io.on("connection", function(socket) {
    socket.join(constants.roomLog);
    socket.emit(
        "log",
        createLog({
            reason: "建立链接",
            resType: "connect"
        })
    );
});

// app.listen(80, () => console.log('server start on port 80'));
