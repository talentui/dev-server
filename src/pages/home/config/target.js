import React, { Component } from "react";
import { connect } from "react-redux";
import { mapActionCreators } from "&/helpers/easy-import";
import { homeTargetActions } from "&/reducers/home/target";

@connect(
    state => ({ data: state.getIn(["home", "target"]) }),
    mapActionCreators(homeTargetActions)
)
export default class Target extends Component {
    handleChangeName = ({ target }) => {
        let { changeTargetName } = this.props;
        changeTargetName(target.value);
    };

    handleChangeIP = ({ target }) => {
        let { changeTargetIP } = this.props;
        changeTargetIP(target.value);
    };

    render() {
        let { data } = this.props;
        return (
            <section className="target-config config-section">
                <div className="i">
                    <label>代理地址：</label>
                    <input
                        type="text"
                        value={data.get("name")}
                        onChange={this.handleChangeName}
                    />
                </div>
                <div className="i">
                    <label>公网IP：</label>
                    <input
                        type="text"
                        value={data.get("ip")}
                        onChange={this.handleChangeIP}
                    />
                </div>
            </section>
        );
    }
}
