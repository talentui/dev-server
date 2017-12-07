import { v1 } from 'uuid';
import { fromJS, List } from 'immutable';
import { constSpecial } from './const';

const initState = List([]);

export default function (state = initState, action) {

    switch (action.type) {
        case constSpecial.ADD_A_SPECIAL: {
            return state.push(fromJS(action.config))
        }

        case constSpecial.CHANGE_SPECIAL_REG: {
            let { specialId, reg } = action;
            let globalIndex = state.findIndex(item => item.get('id') === specialId);
            return state.setIn([globalIndex, 'reg'], reg);
        }

        case constSpecial.CHANGE_SPECIAL_NAME: {
            let { specialId, name } = action;
            let globalIndex = state.findIndex(item => item.get('id') === specialId);
            return state.setIn([globalIndex, 'name'], name);
        }
        case constSpecial.CHANGE_SPECIAL_PORT: {
            let { specialId, port } = action;
            let globalIndex = state.findIndex(item => item.get('id') === specialId);
            return state.setIn([globalIndex, 'port'], port);
        }
        case constSpecial.CHANAGE_SPECIAL_REFERER: {
            let { specialId, referer } = action;
            let globalIndex = state.findIndex(item => item.get('id') === specialId);
            return state.setIn([globalIndex, 'referer'], referer);
        }
        case constSpecial.DELETE_A_SPECIAL: {
            return state.filter(item=>item.get('id') !== action.specialId)
        }
    }

    return state;

}