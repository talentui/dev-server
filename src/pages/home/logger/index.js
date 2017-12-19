import React, { Component } from "react";
import io from "socket.io-client";

export default class Logger extends Component {
    constructor(p, c) {
        super(p, c);
        this.socket = this.initSocket();
    }

    state = {
        logs: []
    };

    initSocket() {
        let { origin } = window.location;
        let socket = io.connect(origin);
        socket.on("log", log => {
            this.setState({
                logs: [log, ...this.state.logs]
            });
        });
        return socket;
    }

    renderLogs() {
        return this.state.logs.map((log, index) => {
            let { type } = log;
            if (type === "connect") {
                return (
                    <div className="log-connected log-content" key={log.id}>
                        <span className="log-line-num">{index}</span>
                        <span className="c">{log.decision}</span>
                    </div>
                );
            } else if (type === "proxy") {
                return (
                    <div className="log-proxy log-content" key={log.id}>
                        <span className="log-line-num">{index}</span>
                        <span>{log.decision}</span>
                        <span className="log-label">标识：</span>
                        <span>{log.identifier}</span>
                        <span className="log-label">请求资源路径：</span>
                        <span>{log.requestPath}</span>
                        <span className="log-label">实际响应地址：</span>
                        <span>{`${log.responseTarget}/${
                            log.responsePath
                        }`}</span>
                    </div>
                );
            }
        });
    }

    render() {
        let { show } = this.props;
        return (
            <div
                className="logger"
                style={{ display: show ? "block" : "none" }}
            >
                {this.renderLogs()}
            </div>
        );
    }
}
