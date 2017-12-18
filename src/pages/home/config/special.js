import React, { Component } from "react";
import { connect } from "react-redux";
import { mapActionCreators } from "&/helpers/easy-import";
import { homeSpecialActions } from "&/reducers/home/action";

const tableWidth = {
    t1: {
        width: "30px"
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

@connect(state => {
    return { data: state.getIn(["home", "special"]) };
}, mapActionCreators(homeSpecialActions))
export default class Special extends Component {
    handleAddGlobal = () => {
        let { addSpecial } = this.props;
        addSpecial();
    };

    handleChangeReg = specialId => ({ target }) => {
        let { changeSpecialReg } = this.props;
        changeSpecialReg(target.value.trim(), specialId);
    };

    handleChangeName = specialId => ({ target }) => {
        let { changeSpecialName } = this.props;
        changeSpecialName(target.value, specialId);
    };

    handleChangePort = specialId => ({ target }) => {
        this.props.changeSpecialPort(target.value.trim(), specialId);
    };

    handleChangeReferer = specialId => ({ target }) => {
        this.props.changeSpecialReferer(target.value.trim(), specialId);
    };

    handleDeleteConfig = specialId => () => {
        this.props.deleteSpecialConfig(specialId);
    };

    handleToggleEnabled = specialId => () => {
        this.props.toggleEnabled(specialId);
    };

    handleChangeDirectMatch = specialId => ({ target }) => {
        this.props.changeSpecialDirectMatch(target.value.trim(), specialId);
    };

    renderConfigList() {
        let {data} = this.props;
        if(!data || !data.size) {
            return <tr>
                <td colSpan='6' className='no-config'>
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
                        <input
                            type="text"
                            value={item.get("port")}
                            onChange={this.handleChangePort(id)}
                            placeholder="端口号"
                        />
                    </td>
                    <td>
                        <input className='ipt-type-reg'
                            type="text"
                            value={item.get("reg")}
                            onChange={this.handleChangeReg(id)}
                            placeholder="配置规则"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={item.get("referer")}
                            onChange={this.handleChangeReferer(id)}
                            placeholder="引用地址"
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
            <section className="special-config config-section">
                <h3 className="server-action">
                    代理
                    <button
                        onClick={this.handleAddGlobal}
                        className="btn-add-pink"
                    >
                        {" "}
                        添加{" "}
                    </button>
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th style={tableWidth.t1}>
                                状态
                            </th>
                            <th style={tableWidth.t2}>标识</th>
                            <th style={tableWidth.t3}>端口</th>
                            <th>规则</th>
                            <th style={tableWidth.t4}>引用地址过滤</th>
                            <th style={tableWidth.t7}>操作</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderConfigList()}</tbody>
                </table>
            </section>
        );
    }
}
