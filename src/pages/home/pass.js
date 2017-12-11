import React, { Component } from "react";
import { connect } from "react-redux";
import { mapActionCreators } from "&/helpers/easy-import";
import { homePassActions } from "&/reducers/home/action";

@connect(state => {
    return { data: state.getIn(["home", "pass"]) };
}, mapActionCreators(homePassActions))
export default class Pass extends Component {
    handleToggleEnabled = passId => () => {
        this.props.toggleEnabled(passId);
    };

    handleChangeReg = passId => ({target}) => {
        this.props.changePassReg(passId, target.value)
    };

    handleDeleteConfig = passId => () => {
        this.props.deletePass(passId);
    };

    handleAddPass = () => {
        this.props.addPass();
    };

    renderPassList() {
        return this.props.data.map(item => {
            let id = item.get("id");
            return (
                <div key={id} className="config-item">
                    <input
                        type="checkbox"
                        className="config-enbaled"
                        checked={item.get("enabled") || false}
                        onChange={this.handleToggleEnabled(id)}
                    />
                    <input
                        type="text"
                        value={item.get("reg")}
                        onChange={this.handleChangeReg(id)}
                        placeholder="配置名称"
                        className="config-input-right wide "
                    />
                    <button
                        className="delete"
                        onClick={this.handleDeleteConfig(id)}
                    >
                        删除
                    </button>
                </div>
            );
        });
    }

    render() {
        return (
            <section className="special-config config-section">
                <h3 className="server-action">
                    跳过规则
                    <button
                        onClick={this.handleAddPass}
                        className="btn-add-pink"
                    >
                        添加
                    </button>
                </h3>
                {this.renderPassList()}
            </section>
        );
    }
}
