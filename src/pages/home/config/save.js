import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveData, clearSaveStatus } from '&/reducers/home/action';
import Status from './status';

@connect(state => ({data: state.getIn(['home', 'status'])}))
export default class Save extends Component {

    handleSave = () => {
        let { dispatch, data } = this.props;
        if(data) return;
        dispatch(saveData());
    }

    handleTipExit = () => {
        this.props.dispatch(clearSaveStatus())
    }

    render() {
        return  <div className='save-config' key='save'>
            <button onClick={this.handleSave}>保存全部</button>
            { this.props.data && <Status code={this.props.data} onExit={this.handleTipExit} />}
        </div>
    }
}