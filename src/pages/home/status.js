import React, { Component } from 'react';
import { Transition } from 'react-transition-group';


export default class Status extends Component {

    state = {
        show: true
    }

    componentDidMount(){
        setTimeout(this.props.onExit, 2000)
    }

    render() {
        let { code } = this.props;
        let isOK = code === '200';
        return <div className={`save-${isOK ? 'success' : 'failed'}`}>{`保存${isOK ? '成功' : '失败'}`}</div>
    }
}