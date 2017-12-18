import React, { Component } from "react";
import { connect } from "react-redux";
import { mapActionCreators } from "&/helpers/easy-import";
import { homeTalentuiActions } from "&/reducers/home/action";

@connect(
    state => ({ data: state.getIn(["home", "talentui"]) }),
    mapActionCreators(homeTalentuiActions)
)
export default class Talentui extends Component {
    state = {
        showTemplate: false
    };

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

    handleChangeEnabled = projectId => () => {
        this.props.toggleEnabled(projectId);
    };

    handleDeleteProject = projectId => () => {
        this.props.deleteTalentuiProject(projectId);
    };

    toggleTemplate = () => {
        this.setState({
            showTemplate: !this.state.showTemplate
        });
    };

    renderProjectList() {
        let { data } = this.props;
        if(!data || !data.size || !data.get('projects').size) {
            return <div className='no-config'>木有任何配置</div>
        }
        return data.get("projects").map(item => {
            let id = item.get("id");
            return (
                <div key={id} className="config-item">
                    <input
                        type="checkbox"
                        className="config-enabled"
                        checked={item.get("enabled") || false}
                        onChange={this.handleChangeEnabled(id)}
                    />
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
                    <button
                        className="delete"
                        onClick={this.handleDeleteProject(id)}
                    >
                        删除
                    </button>
                </div>
            );
        });
    }

    render() {
        return (
            <section className="talentui-config config-section">
                <h3 className="server-action">
                    TalentUI
                    <button
                        onClick={this.handleAddProject}
                        className="btn-add-pink"
                    >
                        添加
                    </button>
                </h3>

                <div>{this.renderProjectList()}</div>
                <div
                    className="talentui-template"
                    style={{
                        display: this.state.showTemplate ? "block" : "none"
                    }}
                >
                    <input
                        type="text"
                        value={this.props.data.get("template")}
                        onChange={this.handleChangeTemplate}
                        placeholder="配置模板"
                        className="config-input-right wide ipt-type-reg"
                    />
                </div>
                <div
                    style={{
                        display: this.state.showTemplate ? "none" : "block"
                    }}
                >
                    <a href="javascript:;" onClick={this.toggleTemplate}>
                        编辑模板
                    </a>
                </div>
            </section>
        );
    }
}
