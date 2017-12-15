import React, { Component } from "react";
import { connect } from "react-redux";

import { getData } from "&/reducers/home/action";
import Special from "./special";
import Target from "./target";
import Save from "./save";
import TalentUI from "./talentui";
import Pass from "./pass";
import Direct from './direct';

@connect()
export default class Config extends Component {
    
    componentWillMount() {
        this.props.dispatch(getData());
    }

    downloadCert(){
        window.open('/api/download/cert')
    }

    render() {
        return [
            <Save key="save" />,
            <Target key="target" />,
            <TalentUI key="talentui" />,
            <Special key="special" />,
            <Direct key='direct'/>,
            <Pass key="pass" />,
            <div key="download">
                <button onClick={this.downloadCert} className='download'>下载ssl证书</button>
            </div>,
        ];
    }
}