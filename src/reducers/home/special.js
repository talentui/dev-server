import { v1 } from "uuid";
import { fromJS, List } from "immutable";
import { constSpecial } from "./const";

const initState = List([]);

export default function(state = initState, action) {
    let specialIndex;
    let { specialId } = action;
    if (specialId)
        specialIndex = state.findIndex(item => item.get("id") === specialId);
    switch (action.type) {
        case constSpecial.ADD_A_SPECIAL: {
            return state.push(fromJS(action.config));
        }

        case constSpecial.CHANGE_SPECIAL_REG: {
            let { reg } = action;
            return state.setIn([specialIndex, "reg"], reg);
        }

        case constSpecial.CHANGE_SPECIAL_NAME: {
            let { name } = action;
            return state.setIn([specialIndex, "name"], name);
        }
        case constSpecial.CHANGE_SPECIAL_PORT: {
            let { port } = action;
            return state.setIn([specialIndex, "port"], port);
        }
        case constSpecial.CHANAGE_SPECIAL_REFERER: {
            let { referer } = action;
            return state.setIn([specialIndex, "referer"], referer);
        }
        case constSpecial.DELETE_A_SPECIAL: {
            return state.filter(item => item.get("id") !== action.specialId);
        }
        case constSpecial.TOGGLE_SPECIAL_ENABLED: {
            let path = [specialIndex, "enabled"];
            return state.setIn(path, !state.getIn(path));
        }
    }

    return state;
}
