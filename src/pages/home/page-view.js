import React, { Component } from "react";
import { connect } from "react-redux";

import { getData } from "&/reducers/home/action";
import Special from "./special";
import Target from "./target";
import Save from "./save";
import TalentUI from "./talentui";

@connect()
export default class Home extends Component {
    
    componentWillMount() {
        this.props.dispatch(getData());
    }

    render() {
        return [
            <Save key="save" />,
            <Target key="target" />,
            <TalentUI key="talentui" />,
            <Special key="special" />
        ];
    }
}
