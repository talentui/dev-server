import React, { Component } from "react";
import { connect } from "react-redux";
import { mapActionCreators } from "&/helpers/easy-import";
import { homeTalentuiActions } from "&/reducers/home/action";

@connect(
    state => ({ data: state.getIn(["home", "talentui"]) }),
    mapActionCreators(homeTalentuiActions)
)
export default class Talentui extends Component {
    handleChangeTemplate = ({ target }) => {
        this.props.changeTemplate(target.value);
    };

    handleChangeProjectName = projectId => ({ target }) => {
        this.props.changeProjectName(target.value, projectId);
    };

    handleChangeProjectPort = projectId => ({ target }) => {
        this.props.changeProjectPort(target.value, projectId);
    };

    handleAddProject = () => {
        this.props.addProject();
    };

    renderProjectList() {
        let { data } = this.props;
        return data.get("projects").map(item => {
            let id = item.get("id");
            return (
                <div key={id} className="config-item">
                    <input
                        type="text"
                        value={item.get("name")}
                        placeholder="项目目录"
                        onChange={this.handleChangeProjectName(id)}
                        className="config-input-left"
                    />{" "}
                    -
                    <input
                        type="text"
                        value={item.get("port")}
                        placeholder="本地端口"
                        onChange={this.handleChangeProjectPort(id)}
                        className="config-input-left"
                    />
                </div>
            );
        });
    }

    render() {
        return (
            <section className="talentui-config config-section">
                <h3 className="server-action">
                    北森 TalentUI 项目快速配置{" "}
                    <button
                        onClick={this.handleAddProject}
                        className="btn-add-pink"
                    >
                        添加项目
                    </button>
                </h3>

                <div>{this.renderProjectList()}</div>
                <div className="talentui-template">
                    <input
                        type="text"
                        value={this.props.data.get("template")}
                        onChange={this.handleChangeTemplate}
                        placeholder="配置模板"
                        className="config-input-right wide"
                    />
                </div>
            </section>
        );
    }
}
