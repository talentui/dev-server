import combineImmutableReducers from "@talentui/biz-helper/lib/utils/combineImmutableReducers";
import {
    GET_CONFIG_FROM_SERVER,
    SAVE_CONFIG_TO_SERVER,
    SAVE_CONFIG_SUCCESS,
    CLEAR_SAVING_STATUS
} from "./const";

import special from "./special";
import target from "./target";
import talentui from "./talentui";

export default function(state, action) {
    switch (action.type) {
        case GET_CONFIG_FROM_SERVER: {
            return action.home;
        }
        case SAVE_CONFIG_SUCCESS: {
            return state.set("status", action.status);
        }
        case CLEAR_SAVING_STATUS: {
            return state.delete("status");
        }
    }

    return combineImmutableReducers({
        special,
        target,
        talentui
    })(state, action);
}
