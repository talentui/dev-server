import { v1 } from 'uuid';
import { fromJS } from 'immutable';
import {constGlobal} from './const';

const initState = fromJS([
    {
        name: 'dll',
        id: v1(),
        reg: "\/ux\/upaas\/release\/dist\/((?:\w+\/)*)([a-zA-Z]+(?:-[a-z]+)*)+(?:-\w+)?(\.chunk)?(?:\.min)?(\.\w{2,4})",
    },
]);

export default function (state = initState, action) {

    switch(action.type) {
        case constGlobal.ADD_A_GLOBAL: {
            return state.push(fromJS(action.config))
        }

        case constGlobal.CHANGE_GLOBAL_REG: {
            let {globalId, reg} = action;
            let globalIndex = state.findIndex(item => item.get('id') === globalId);
            return state.setIn([globalIndex, 'reg'], reg);
        }

        case constGlobal.CHANGE_GLOBAL_NAME: {
            let {globalId, name} = action;
            let globalIndex = state.findIndex(item => item.get('id') === globalId);
            return state.setIn([globalIndex, 'name'], name);
        }
    }

    return state;

}