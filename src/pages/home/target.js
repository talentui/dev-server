import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapActionCreators from '@talentui/biz-helper/lib/utils/mapActionCreators';
import { homeTargetActions } from '&/reducers/home/action';

@connect(state => ({ data: state.getIn(['home', 'target']) }), mapActionCreators(homeTargetActions))
export default class Target extends Component {

    handleChangeName = ({ target }) => {
        let { changeTargetName } = this.props;
        changeTargetName(target.value)
    }

    handleChangeIP = ({target}) => {
        let { changeTargetIP } = this.props;
        changeTargetIP(target.value)
    }

    render() {
        let {data} = this.props;
        return <section className='target-config config-section'>
            <div className='i'>
                <label>目标服务器：
                    <input type='text' value={data.get('name')} onChange={this.handleChangeName} />
                </label>
            </div>
            <div className='i'>
                <label>公网IP地址：
                    <input type='text' value={data.get('ip')} onChange={this.handleChangeIP} />
                </label>
            </div>
        </section>
    }
}