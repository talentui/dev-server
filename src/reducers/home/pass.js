import { List } from "immutable";
import { constPass } from "./const";
import { fromJS } from "immutable";
import { v1 } from "uuid";

const initState = List([]);

export const actions = {
    addPass: function() {
        return {
            type: constPass.ADD_PASS_CONFIG,
            pass: fromJS({
                id: v1(),
                reg: ""
            })
        };
    },
    deletePass: function(passId) {
        return {
            type: constPass.DELETE_PASS_CONFIG,
            passId
        };
    },
    changePassReg: function(passId, reg) {
        return {
            type: constPass.CHANAGE_PASS_REG,
            passId,
            reg
        };
    },
    toggleEnabled: function(passId) {
        return {
            type: constPass.TOGGLE_PASS_ENABLED,
            passId
        };
    },
    changeName: function(passId, name) {
        return {
            type: constPass.CHANGE_PASS_NAME,
            passId,
            name
        };
    }
};

export default function(state = initState, action) {
    let passIndex;
    let { passId } = action;
    if (passId) passIndex = state.findIndex(item => item.get("id") === passId);
    switch (action.type) {
        case constPass.ADD_PASS_CONFIG: {
            return state.push(action.pass);
        }
        case constPass.CHANAGE_PASS_REG: {
            return state.setIn([passIndex, "reg"], action.reg);
        }
        case constPass.DELETE_PASS_CONFIG: {
            let { passId } = action;
            return state.filter(item => item.get("id") !== passId);
        }
        case constPass.TOGGLE_PASS_ENABLED: {
            let path = [passIndex, "enabled"];
            return state.setIn(path, !state.getIn(path));
        }
        case constPass.CHANGE_PASS_NAME: {
            let path = [passIndex, "name"];
            return state.setIn(path, action.name);
        }
    }
    return state;
}
