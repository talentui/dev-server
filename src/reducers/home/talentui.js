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
                return projects.setIn([projIndex, 'name'], action.name);
            });
        }
        case constTalentUI.CHANAGE_TALENTUI_PROJECT_PORT: {
            return state.update("projects", projects => {
                let projIndex = projects.findIndex(
                    item => item.get("id") === action.projectId
                );
                return projects.setIn([projIndex, 'port'], action.port);
            });
        }
        case constTalentUI.CHANAGE_TALENTUI_TEMPLATE: {
            return state.set('template', action.template)
        }
    }
    return state;
}
