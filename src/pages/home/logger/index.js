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

    renderLogs(){
        return this.state.logs.map((log, index) => {
            return <div className={`log-item-${log.resType}`} key={log.id}>
            {
                `来自 ${log.reqFrom || '浏览器'} 的资源请求 ${log.reqPath} => 匹配结果 ${log.reason} => 地址： ${log.resFrom}/${log.resPath}`
            }</div>
        })
    }

    render() {
        return <div className='logger'>
            {this.renderLogs()}
        </div>
    }
}
