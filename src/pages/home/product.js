import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapActionCreators from '@talentui/biz-helper/lib/utils/mapActionCreators';
import { homeProductActions } from '&/reducers/home/action';

@connect(state => {
    return { data: state.getIn(['home', 'product']) }
}, mapActionCreators(homeProductActions))
export default class Product extends Component {

    handleAddProduct = () => {
        let { addProduct } = this.props;
        let port = parseInt(this.getBiggestPort());
        addProduct(port)
    }

    handleChangeProdName = (prodId) => ({ target }) => {
        let { changeProdName } = this.props;
        changeProdName(target.value, prodId);
    }

    handleChangeProdPort = (prodId) => ({ target }) => {
        let { changeProdPort } = this.props;
        changeProdPort(target.value, prodId)
    }

    handleChangeName = (prodId, configId) => ({ target }) => {
        let { changeConfigName } = this.props;
        changeConfigName(target.value, prodId, configId)
    }

    handleValueChange = (prodId, configId) => ({ target }) => {
        let { value } = target;
        try {
            regObj.compile(value);
        } catch (err) {

        }
        let { changeConfigValue } = this.props;
        changeConfigValue(value, prodId, configId)
    }

    handleAddConfig = (prodId) => () => {
        let { addConfigToProd } = this.props;
        addConfigToProd(prodId);
    }

    getBiggestPort = () => {
        let { data } = this.props;
        let allPort = data.map(item => {
            return item.get('port');
        }).sort().toJS();
        let l = allPort.length;
        if (l > 0) {
            return String(parseInt(allPort[l - 1]) + 1);
        }
        return '3000';
    }

    renderConfig(configs, prodId) {
        return configs.map(item => {
            return <div key={item.get('id')} className='config-item'>
                <input type='text' value={item.get('name')} onChange={this.handleChangeName(prodId, item.get('id'))} className='config-input-left' placeholder='配置名称' />-
                <input type='text' value={item.get('reg')} onChange={this.handleValueChange(prodId, item.get('id'))} className='config-input-right' placeholder='正则表达式' />
            </div>
        })
    }

    renderProdList() {
        return this.props.data.map(item => {
            let id = item.get('id');
            return <section key={id} className='product-item'>
                <h3>
                    <input type='text' value={item.get('name')} onChange={this.handleChangeProdName(id)} placeholder='产品目录' className='prod-name' />-
                    <input type='text' value={item.get('port')} onChange={this.handleChangeProdPort(id)} placeholder='代理端口' className='prod-port' />
                    <button onClick={this.handleAddConfig(id)}> 添加配置 </button>
                </h3>
                {this.renderConfig(item.get('configs'), item.get('id'))}
            </section>
        })
    }

    render() {
        return <section className='product-config config-section'>
            <div className="server-action" >
                <button onClick={this.handleAddProduct}> 添加项目 </button>
            </div>
            {this.renderProdList()}
        </section>
    }
}