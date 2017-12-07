import {Map} from 'immutable';
import {constTarget} from './const';

const initState = Map({
    name: 'stnew03.beisen.com',
    ip: '60.28.207.67'
})

export default function(state = initState, action){
    switch(action.type) {
        case constTarget.CHANGE_TARGET_NAME: {
            return state.set('name', action.name)
        }
        case constTarget.CHANAGE_TARGET_IP: {
            return state.set('ip', action.ip)
        }
    }
    return state;
}