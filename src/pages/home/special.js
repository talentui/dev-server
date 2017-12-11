import React, { Component } from "react";
import { connect } from "react-redux";
import { mapActionCreators } from "&/helpers/easy-import";
import { homeSpecialActions } from "&/reducers/home/action";

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

  renderConfigList() {
    return this.props.data.map(item => {
      let id = item.get("id");
      return (
        <div key={id} className="config-item">
          <input
            type="text"
            value={item.get("name")}
            onChange={this.handleChangeName(id)}
            placeholder="配置名称"
            className="config-input-left "
          />-
          <input
            type="text"
            value={item.get("port")}
            onChange={this.handleChangePort(id)}
            placeholder="端口号"
            className="config-input-left"
          />-
          <input
            type="text"
            value={item.get("referer")}
            onChange={this.handleChangeReferer(id)}
            placeholder="引用地址"
            className="config-input-left"
          />-
          <input
            type="text"
            value={item.get("reg")}
            onChange={this.handleChangeReg(id)}
            placeholder="配置规则"
            className="config-input-right short"
          />
          <button className="delete" onClick={this.handleDeleteConfig(id)}>
            删除
          </button>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="special-config config-section">
        <div className="server-action">
          <button onClick={this.handleAddGlobal}> 添加特殊配置 </button>
        </div>
        {this.renderConfigList()}
      </section>
    );
  }
}
