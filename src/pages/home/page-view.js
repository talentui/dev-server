import React, { Component } from 'react';
import {connect} from 'react-redux';
import {saveData} from '&/reducers/home/action'

import Product from './product';
import Global from './global';
import Target from './target'

@connect()
export default class Home extends Component {

    handleSave = () => {
        let {dispatch} = this.props;
        dispatch(saveData());
    }

    render() {
        return [
            <div className='save-config' key='save'>
                <button onClick={this.handleSave}>保存全部</button>
            </div>,
            <Target key='target'/>,
            <Product key='product'/>,
            <Global key='global'/>
        ]
    }
}