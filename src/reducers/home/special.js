import { v1 } from "uuid";
import { fromJS, List } from "immutable";
import { constSpecial, constGlobal } from "./const";

export const homeSpecialActions = {
    addSpecial(groupId) {
        return {
            type: constSpecial.ADD_A_SPECIAL,
            config: {
                port: "",
                name: "",
                id: v1(),
                reg: "",
                referer: "",
                groupId
            }
        };
    },

    addGroup() {
        return {
            type: constGlobal.ADD_GROUP,
            from: "special",
            group: {
                id: v1(),
                name: "新的组"
            }
        };
    },

    deleteGroup(groupId) {
        return {
            type: constGlobal.DELETE_GROUP,
            from: "special",
            groupId
        };
    },

    changeGroupName(groupId, name) {
        return {
            type: constGlobal.CHANAGE_GROUP_NAME,
            from: "special",
            groupId,
            name
        };
    },

    changeSpecialName(name, specialId) {
        return { type: constSpecial.CHANGE_SPECIAL_NAME, name, specialId };
    },
    changeSpecialReg(reg, specialId) {
        return { type: constSpecial.CHANGE_SPECIAL_REG, reg, specialId };
    },
    changeSpecialPort(port, specialId) {
        return { type: constSpecial.CHANGE_SPECIAL_PORT, port, specialId };
    },
    changeSpecialReferer(referer, specialId) {
        return {
            type: constSpecial.CHANAGE_SPECIAL_REFERER,
            referer,
            specialId
        };
    },
    deleteSpecialConfig(specialId) {
        return { type: constSpecial.DELETE_A_SPECIAL, specialId };
    },
    toggleEnabled(specialId) {
        return {
            type: constSpecial.TOGGLE_SPECIAL_ENABLED,
            specialId
        };
    },
    toggleGroupEnabled(groupId, groupIsDefault, checked) {
        return {
            type: constSpecial.TOGGLE_GROUP_ITEM_ENABLED,
            groupId,
            groupIsDefault,
            checked
        };
    }
};

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
        case constSpecial.TOGGLE_GROUP_ITEM_ENABLED: {
            let { groupId, groupIsDefault, checked } = action;
            return state.map(item => {
                let itemGroupId = item.get("groupId");
                if (
                    (itemGroupId && itemGroupId === groupId) ||
                    (!itemGroupId && groupIsDefault)
                ) {
                    return item.set("enabled", checked);
                }
                return item;
            });
        }
    }

    return state;
}
