import { List } from "immutable";
import { constPass } from "./const";

const initState = List([]);

export default function(state = initState, action) {
    switch (action.type) {
        case constPass.ADD_PASS_CONFIG: {
            return state.push(action.pass);
        }
        case constPass.CHANAGE_PASS_REG: {
            let {passId, reg} = action;
            let passIndex = state.findIndex(item =>item.get('id') === passId);
            return state.setIn([passIndex, 'reg'], reg)
        }
        case constPass.DELETE_PASS_CONFIG: {
            let {passId} = action;
            return state.filter(item => item.get('id') !== passId);
        }
        case constPass.TOGGLE_PASS_ENABLED: {
            let {passId} = action;
            let passIndex = state.findIndex(item =>item.get('id') === passId);
            let path = [passIndex, 'enabled'];
            return state.setIn(path, !state.getIn(path))
        }
    }
    return state;
}
