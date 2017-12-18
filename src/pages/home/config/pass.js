import React, { Component } from "react";
import { connect } from "react-redux";
import { mapActionCreators } from "&/helpers/easy-import";
import { actions } from "&/reducers/home/pass";
const tableWidth = {
    t1: {
        width: "40px"
    },
    t2: {
        width: "80px"
    },
    t3: {
        width: "80px"
    }
};

@connect(state => {
    return { data: state.getIn(["home", "pass"]) };
}, mapActionCreators(actions))
export default class Pass extends Component {
    handleToggleEnabled = passId => () => {
        this.props.toggleEnabled(passId);
    };

    handleChangeReg = passId => ({ target }) => {
        this.props.changePassReg(passId, target.value);
    };

    handleDeleteConfig = passId => () => {
        this.props.deletePass(passId);
    };

    handleAddPass = () => {
        this.props.addPass();
    };

    handleChangeName = passId => ({ target }) => {
        this.props.changeName(passId, target.value);
    };

    renderPassList() {
        let {data} = this.props;
        if(!data || !data.size) {
            return <tr>
                <td colSpan='4' className='no-config'>
                    木有任何配置
                </td>
            </tr>
        }
        return this.props.data.map(item => {
            let id = item.get("id");
            return (
                <tr key={id} className="config-item">
                    <td>
                        <input
                            type="checkbox"
                            className="config-enbaled"
                            checked={item.get("enabled") || false}
                            onChange={this.handleToggleEnabled(id)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={item.get("name")}
                            onChange={this.handleChangeName(id)}
                            placeholder="配置名称"
                        />
                    </td>
                    <td>
                        <input className='ipt-type-str'
                            type="text"
                            value={item.get("reg")}
                            onChange={this.handleChangeReg(id)}
                            placeholder="配置路径"
                        />
                    </td>
                    <td>
                        <button
                            className="delete"
                            onClick={this.handleDeleteConfig(id)}
                        >
                            删除
                        </button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <section className="pass-config config-section">
                <h3 className="server-action">
                    跳过
                    <button
                        onClick={this.handleAddPass}
                        className="btn-add-pink"
                    >
                        添加
                    </button>
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th style={tableWidth.t1} >状态</th>
                            <th style={tableWidth.t2}>标识</th>
                            <th>请求地址</th>
                            <th style={tableWidth.t3}>操作</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderPassList()}</tbody>
                </table>
            </section>
        );
    }
}
