import React, { Component } from "react";
import { connect } from "react-redux";
import { mapActionCreators } from "&/helpers/easy-import";
import { homeSpecialActions } from "&/reducers/home/special";
import { addGroup } from "&/reducers/home/global";

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
    return {
        specialData: state.getIn(["home", "special"]),
        groupData: state.getIn(["home", "groups", "special"])
    };
}, mapActionCreators(homeSpecialActions))
export default class Special extends Component {
    state = {
        currentEdit: ""
    };

    handleAddSpecial = groupId => () => {
        let { addSpecial } = this.props;
        addSpecial(groupId);
    };

    handleChangeReg = specialId => ({ target }) => {
        let { changeSpecialReg } = this.props;
        changeSpecialReg(target.value, specialId);
    };

    handleChangeName = specialId => ({ target }) => {
        let { changeSpecialName } = this.props;
        changeSpecialName(target.value, specialId);
    };

    handleChangePort = specialId => ({ target }) => {
        this.props.changeSpecialPort(target.value, specialId);
    };

    handleChangeReferer = specialId => ({ target }) => {
        this.props.changeSpecialReferer(target.value, specialId);
    };

    handleDeleteConfig = specialId => () => {
        this.props.deleteSpecialConfig(specialId);
    };

    handleToggleEnabled = specialId => () => {
        this.props.toggleEnabled(specialId);
    };

    handleChangeDirectMatch = specialId => ({ target }) => {
        this.props.changeSpecialDirectMatch(target.value, specialId);
    };

    handleAddGroup = () => {
        this.props.addGroup();
    };

    handleChangeGroupName = groupId => ({ target }) => {
        this.props.changeGroupName(groupId, target.value);
    };

    handleDeleteGroup = groupId => () => {
        this.props.deleteGroup(groupId);
    };

    handleToggleGroupEnabled = (groupId, groupIsDefault) => ({target}) => {
        this.props.toggleGroupEnabled(groupId, groupIsDefault, target.checked)
    }

    setCurrentEdit = groupId => () => {
        this.setState({
            currentEdit: groupId
        });
    };

    getGroupItem(group) {
        let { specialData } = this.props;
        let groupType = group.get("type");
        let groupId = group.get("id");
        return specialData.filter(special => {
            let fromGroupId = special.get("groupId");
            if (fromGroupId) {
                return groupId === fromGroupId;
            } else {
                return groupType === "default";
            }
        });
    }

    renderItem(groupItems) {
        if (!groupItems || !groupItems.size) {
            return (
                <tr>
                    <td colSpan="6" className="no-config">
                        木有任何配置
                    </td>
                </tr>
            );
        }
        return groupItems.map(item => {
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
                        <input
                            className="ipt-type-reg"
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

    renderGroup() {
        let { groupData } = this.props;
        return groupData.map(group => {
            let id = group.get("id");
            let groupIsDefault = group.get("type") === "default";
            let groupItems = this.getGroupItem(group);
            let itemUnabledIndex = groupItems.findIndex(
                item => item.get("enabled") !== true
            );
            let elIptName = (
                <input
                    value={group.get("name")}
                    readOnly={this.state.currentEdit !== id}
                />
            );
            if (!groupIsDefault) {
                elIptName = React.cloneElement(elIptName, {
                    onDoubleClick: this.setCurrentEdit(id),
                    onBlur: this.setCurrentEdit(""),
                    onChange: this.handleChangeGroupName(id)
                });
            }
            return (
                <div key={id}>
                    <h2 className="group-action">
                        {elIptName}
                        {group.get("type") !== "default" && (
                            <a
                                href="javascript:;"
                                onClick={this.handleDeleteGroup(id)}
                            >
                                删除
                            </a>
                        )}
                    </h2>
                    <section className="special-config config-section">
                        <div className="server-action">
                            <button
                                onClick={this.handleAddSpecial(id)}
                                className="btn-add-pink"
                            >
                                添加
                            </button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th style={tableWidth.t1}>
                                        <input
                                            type="checkbox"
                                            checked={
                                                groupItems.size > 0 &&
                                                itemUnabledIndex === -1
                                            }
                                            onChange={this.handleToggleGroupEnabled(
                                                id, groupIsDefault
                                            )}
                                        />
                                    </th>
                                    <th style={tableWidth.t2}>标识</th>
                                    <th style={tableWidth.t3}>端口</th>
                                    <th>规则</th>
                                    <th style={tableWidth.t4}>引用地址过滤</th>
                                    <th style={tableWidth.t7}>操作</th>
                                </tr>
                            </thead>
                            <tbody>{this.renderItem(groupItems)}</tbody>
                        </table>
                    </section>
                </div>
            );
        });
    }

    render() {
        let elAddGroup = (
            <div>
                <button className="btn-add-group" onClick={this.handleAddGroup}>
                    添加分组
                </button>
            </div>
        );

        return (
            <div className="group-box">
                {elAddGroup}
                {this.renderGroup()}
            </div>
        );
    }
}
