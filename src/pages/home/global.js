import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapActionCreators from '@talentui/biz-helper/lib/utils/mapActionCreators';
import { homeGlobalActions } from '&/reducers/home/action';

@connect(state => {
    return { data: state.getIn(['home', 'global']) }
}, mapActionCreators(homeGlobalActions))
export default class Product extends Component {

    handleAddGlobal = () => {
        let { addglobal } = this.props;
        addglobal()
    }

    handleChangeReg = (globalId) => ({ target }) => {
        let { changeGlobalReg } = this.props;
        changeGlobalReg(target.value, globalId);
    }

    handleChangeName = (globalId) => ({ target }) => {
        let { changeGlobalName } = this.props;
        changeGlobalName(target.value, globalId)
    }

    renderConfigList() {
        return this.props.data.map(item => {
            let id = item.get('id');
            return <div key={id} className='config-item'>
                    <input type='text' value={item.get('name')} onChange={this.handleChangeName(id)} placeholder='配置名称' className='config-input-left' />-
                    <input type='text' value={item.get('reg')} onChange={this.handleChangeReg(id)} placeholder='配置规则' className='config-input-right' />
            </div>
        })
    }

    render() {
        return <section className='global-config config-section'>
            <div className="server-action" >
                <button onClick={this.handleAddGlobal}> 添加全局配置 </button>
            </div>
            {this.renderConfigList()}
        </section>
    }
}