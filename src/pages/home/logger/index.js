import React, { Component } from "react";
import io from "socket.io-client";

const reg = /\D/;

export default class Logger extends Component {
    constructor(p, c) {
        super(p, c);
        this.socket = this.initSocket();
    }

    state = {
        logs: [],
        len: 100
    };

    initSocket() {
        let { origin } = window.location;
        let socket = io.connect(origin);
        socket.on("log", log => {
            this.setState({
                logs: [log, ...this.state.logs.slice(0, this.state.len)]
            });
        });
        return socket;
    }

    changeLoggerLength = ({ target }) => {
        let { value } = target;
        if (!reg.test(value)) {
            this.setState({
                len: parseInt(value)
            });
        }
    };

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
            <div style={{ display: show ? "block" : "none" }}>
                <div>
                    <label> 日志最大数量：
                    <input
                        type="text"
                        value={this.state.len}
                        onChange={this.changeLoggerLength}
                    />
                    </label>
                </div>
                <br />
                <div className="logger">{this.renderLogs()}</div>
            </div>
        );
    }
}
