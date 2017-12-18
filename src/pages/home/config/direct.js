import React, { Component } from "react";
import { connect } from "react-redux";
import { mapActionCreators } from "&/helpers/easy-import";
import { actions } from "&/reducers/home/direct.js";

const tableWidth = {
    t1: {
        width: "40px"
    },
    t2: {
        width: "80px"
    },
    t3: {
        width: "80px"
    },
    t4: {
        width: "120px"
    },
    t5: {
        width: "20px"
    },
    t6: {
        width: "200px"
    },
    t7: {
        width: "70px"
    }
};

@connect(
    state => ({ data: state.getIn(["home", "direct"]) }),
    mapActionCreators(actions)
)
export default class Direct extends Component {
    handleAddGlobal = () => {
        let { addDirect } = this.props;
        addDirect();
    };

    handleChangeReg = directId => ({ target }) => {
        let { changeReg } = this.props;
        changeReg(directId, target.value.trim());
    };

    handleChangeName = directId => ({ target }) => {
        let { changeName } = this.props;
        changeName(directId, target.value.trim());
    };

    handleChangeTarget = directId => ({ target }) => {
        this.props.changeTarget(directId, target.value.trim());
    };

    handleDeleteConfig = directId => () => {
        this.props.deleteDirect(directId);
    };

    handleToggleEnabled = directId => () => {
        this.props.toggleEnabled(directId);
    };

    renderConfigList() {
        if (!this.props.data || !this.props.data.size)
            return (
                <tr>
                    <td colSpan="5" className="no-config">
                        还木有任何配置
                    </td>
                </tr>
            );
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
                            placeholder="名称,方便你区分配置"
                        />
                    </td>
                    <td>
                        <input className='ipt-type-str'
                            type="text"
                            value={item.get("reg")}
                            onChange={this.handleChangeReg(id)}
                            placeholder="requrest url"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={item.get("target")}
                            onChange={this.handleChangeTarget(id)}
                            placeholder="添加协议使用远程地址，不添加使用本地文件"
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
            <section className="direct-config config-section">
                <h3 className="server-action">
                    直配
                    <button
                        onClick={this.handleAddGlobal}
                        className="btn-add-pink"
                    >
                        添加
                    </button>
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th style={tableWidth.t1}>
                                状态
                            </th>
                            <th style={tableWidth.t2}>标识</th>
                            <th>Request URL</th>
                            <th>目标</th>
                            <th style={tableWidth.t7}>操作</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderConfigList()}</tbody>
                </table>
            </section>
        );
    }
}
