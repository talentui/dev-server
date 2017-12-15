import { constDirect } from "./const";
import { List, fromJS } from "immutable";
import { v1 } from "uuid";

export const actions = {
    addDirect() {
        return {
            type: constDirect.ADD_DIRECT_CONFIG,
            direct: {
                id: v1(),
                name: "",
                reg: "",
                target: "",
                enabled: false
            }
        };
    },

    deleteDirect(directId) {
        return {
            type: constDirect.DELETE_DIRECT_CONFIG,
            directId
        };
    },

    toggleEnabled(directId) {
        return { type: constDirect.TOGGLE_DIRECT_ENABLED, directId };
    },
    changeReg(directId, reg) {
        return {
            type: constDirect.CHANAGE_DIRECT_REG,
            directId,
            reg
        };
    },
    changeName(directId, name) {
        return {
            type: constDirect.CHANGE_DIRECT_NAME,
            directId,
            name
        };
    },
    changeTarget(directId, target) {
        return {
            type: constDirect.CHANGE_DIRECT_TARGET,
            directId,
            target
        };
    }
};

const initState = List([]);

export default function(state = initState, action) {
    let directIndex;
    let { directId } = action;
    if (directId)
        directIndex = state.findIndex(item => item.get("id") === directId);

    switch (action.type) {
        case constDirect.ADD_DIRECT_CONFIG: {
            return state.push(fromJS(action.direct));
        }
        case constDirect.DELETE_DIRECT_CONFIG: {
            return state.filter(item => item.get("id") !== directId);
        }
        case constDirect.TOGGLE_DIRECT_ENABLED: {
            let path = [directIndex, 'enabled'];
            return state.setIn(path, !state.getIn(path));
        }
        case constDirect.CHANGE_DIRECT_NAME: {
            let path = [directIndex, 'name'];
            return state.setIn(path, action.name)
        }
        case constDirect.CHANAGE_DIRECT_REG: {
            let path = [directIndex, 'reg'];
            return state.setIn(path, action.reg)
        }
        case constDirect.CHANGE_DIRECT_TARGET: {
            let path = [directIndex, 'target'];
            return state.setIn(path, action.target)
        }
    }
    return state;
}
