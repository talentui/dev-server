import React, { Component } from "react";
import { connect } from "react-redux";

import { getData, switchTab } from "&/reducers/home/global";
import Special from "./config/special";
import Target from "./config/target";
import TalentUI from "./config/talentui";
import Pass from "./config/pass";
import Direct from "./config/direct";
import Logger from "./logger";

const tabs = [
    {
        key: "remote",
        name: "服务器配置",
        module: Target
    },
    {
        key: "talentui",
        name: "Talent UI 项目",
        module: TalentUI
    },
    {
        key: "special",
        name: "代理",
        module: Special
    },
    {
        key: "direct",
        name: "直配",
        module: Direct
    },
    {
        key: "pass",
        name: "跳过",
        module: Pass
    }
];

const tablogger = "logger";

@connect(state => ({
    currentTab: state.getIn(["home", "currentTab"] || "remote")
}))
export default class Home extends Component {
    state = {
        currentTab: "remote"
    };

    componentWillMount() {
        this.props.dispatch(getData());
    }

    downloadCert() {
        window.open("/api/download/cert");
    }

    renderTabItem({ key, name }) {
        let { currentTab } = this.props;
        return (
            <li key={key} className={`tab${currentTab === key ? " cur" : ""}`}>
                <a href="javascript:;" onClick={this.handleSwitchTab(key)}>
                    {name}
                </a>
            </li>
        );
    }

    handleSwitchTab = tab => () => {
        this.props.dispatch(switchTab(tab));
    };

    renderTabs() {
        return tabs.map(item => this.renderTabItem(item));
    }

    renderModule() {
        let { currentTab } = this.props;
        let tab = tabs.find(item => item.key === currentTab);
        if (tab) return React.createElement(tab.module);
        return null;
    }

    render() {
        let { currentTab } = this.props;
        return (
            <div className="application">
                <ul className="tabs">
                    {this.renderTabs()}
                    {this.renderTabItem({
                        key: tablogger,
                        name: "日志"
                    })}
                </ul>
                {this.renderModule()}
                <Logger show={currentTab === tablogger} />
                <div key="download" className="download-ssl">
                    <button onClick={this.downloadCert} className="download">
                        下载ssl证书
                    </button>
                </div>
            </div>
        );
    }
}
