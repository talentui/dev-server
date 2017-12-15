import React, { Component } from "react";
// import Logger from './logger';
import Config from "./config";
import Logger from "./logger";

const tabs = ["config", "logger"];

export default class Home extends Component {
    state = {
        currentTab: tabs[1]
    };

    switchTab = index => () => {
        this.setState({
            currentTab: tabs[index]
        });
    };

    render() {
        return (
            <div className="application">
                <ul className="tabs">
                    <li
                        className={`tab${
                            this.state.currentTab === tabs[0] ? " cur" : ""
                        }`}
                    >
                        <a href="javascript:;" onClick={this.switchTab(0)}>
                            配置
                        </a>
                    </li>
                    <li
                        className={`tab${
                            this.state.currentTab === tabs[1] ? " cur" : ""
                        }`}
                    >
                        <a href="javascript:;" onClick={this.switchTab(1)}>
                            日志
                        </a>
                    </li>
                </ul>
                <div
                    style={{
                        display:
                            this.state.currentTab === tabs[0] ? "block" : "none"
                    }}
                >
                    <Config />
                </div>
                <div
                    style={{
                        display:
                            this.state.currentTab === tabs[1] ? "block" : "none"
                    }}
                >
                    <Logger />
                </div>
            </div>
        );
    }
}
