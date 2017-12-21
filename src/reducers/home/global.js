import { fromJS } from "immutable";

import { constGlobal } from "./const";
import { v1 } from "uuid";

export function getData() {
    return function(dispatch) {
        fetch("/api/get")
            .then(function(res) {
                return res.json();
            })
            .then(function(config) {
                dispatch({
                    type: constGlobal.GET_CONFIG_FROM_SERVER,
                    home: fromJS(config),
                    noSave: true
                });
            });
    };
}

export function deleteGroup(id) {
    return {
        type: constGlobal.DELETE_GROUP,
        id
    };
}

export function switchTab(tab) {
    return {
        type: constGlobal.CHANGE_TAB,
        tab
    };
}

export function clearSaveStatus() {
    return { type: constGlobal.CLEAR_SAVING_STATUS };
}

// 未匹配到请求要发送的地址
