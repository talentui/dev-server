import { fromJS } from "immutable";
import { v1 } from "uuid";
import { constTalentUI } from "./const";

const initState = fromJS({
    template: "",
    projects: [
        {
            name: "",
            port: "",
            id: v1()
        }
    ]
});

export const homeTalentuiActions = {
    addProject: function() {
        return {
            type: constTalentUI.ADD_TALENTUI_PROJECT,
            project: {
                name: "",
                port: "",
                id: v1()
            }
        };
    },
    changeProjectName: function(name, projectId) {
        return {
            type: constTalentUI.CHANAGE_TALENTUI_PROJECT_NAME,
            name,
            projectId
        };
    },
    changeProjectPort: function(port, projectId) {
        return {
            type: constTalentUI.CHANAGE_TALENTUI_PROJECT_PORT,
            port,
            projectId
        };
    },
    changeTemplate: function(template) {
        return {
            type: constTalentUI.CHANAGE_TALENTUI_TEMPLATE,
            template
        };
    },
    toggleEnabled: function(projectId) {
        return { type: constTalentUI.TOGGLE_TALENTUI_ENABLED, projectId };
    },
    deleteTalentuiProject: function(projectId) {
        return { type: constTalentUI.DELETE_TALENTUI_PROJECT, projectId };
    }
};


export default function(state = initState, action) {
    switch (action.type) {
        case constTalentUI.ADD_TALENTUI_PROJECT: {
            return state.update("projects", projects => {
                return projects.push(fromJS(action.project));
            });
        }
        case constTalentUI.CHANAGE_TALENTUI_PROJECT_NAME: {
            return state.update("projects", projects => {
                let projIndex = projects.findIndex(
                    item => item.get("id") === action.projectId
                );
                return projects.setIn([projIndex, "name"], action.name);
            });
        }
        case constTalentUI.CHANAGE_TALENTUI_PROJECT_PORT: {
            return state.update("projects", projects => {
                let projIndex = projects.findIndex(
                    item => item.get("id") === action.projectId
                );
                return projects.setIn([projIndex, "port"], action.port);
            });
        }
        case constTalentUI.CHANAGE_TALENTUI_TEMPLATE: {
            return state.set("template", action.template);
        }
        case constTalentUI.TOGGLE_TALENTUI_ENABLED: {
            return state.update("projects", projects => {
                let projIndex = projects.findIndex(
                    item => item.get("id") === action.projectId
                );
                let path = [projIndex, "enabled"];
                return projects.setIn(path, !projects.getIn(path));
            });
        }
        case constTalentUI.DELETE_TALENTUI_PROJECT: {
            return state.update("projects", projects => {
                return projects.filter(
                    item => item.get("id") !== action.projectId
                );
            });
        }
    }
    return state;
}
