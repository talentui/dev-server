import combineImmutableReducers from "@talentui/biz-helper/lib/utils/combineImmutableReducers";
import { fromJS, List, Map } from "immutable";
import { v1 } from "uuid";
import { constGlobal } from "./const";

import special from "./special";
import target from "./target";
import talentui from "./talentui";
import pass from "./pass";
import direct from "./direct";

const initState = fromJS({
    currentTab: "special",
    groups: {
        special: [
            {
                id: v1(),
                name: "默认",
                type: "default"
            }
        ]
    }
});

export default function(state = initState, action) {
    switch (action.type) {
        case constGlobal.GET_CONFIG_FROM_SERVER: {
            return state.merge(action.home);
        }
        case constGlobal.SAVE_CONFIG_SUCCESS: {
            return state.set("status", action.status);
        }
        case constGlobal.CLEAR_SAVING_STATUS: {
            return state.delete("status");
        }
        case constGlobal.CHANGE_TAB: {
            return state.set("currentTab", action.tab);
        }
        case constGlobal.ADD_GROUP: {
            let { from } = action;
            return state.updateIn(["groups", from], groups => {
                groups = groups || List();
                return groups.push(Map(action.group));
            });
        }
        case constGlobal.CHANAGE_GROUP_NAME: {
            let {from, groupId, name} = action;
            return state.updateIn(['groups', from], groups => {
                let groupIndex = groups.findIndex(item => item.get('id') === groupId);
                return groups.setIn([groupIndex, 'name'], name)
            })
        }
        case constGlobal.DELETE_GROUP: {
            let {from, groupId} = action;
            return state.updateIn(['groups', from], groups => {
                return groups.filter(group => group.get('id') !== groupId)
            }).update(from, fromItems => {
                return fromItems.filter(item => item.get('groupId') !== groupId)
            })
        }
    }

    return combineImmutableReducers({
        special,
        target,
        talentui,
        pass,
        direct
    })(state, action);
}
