import {
    INSERT_ACCOUNT
} from '../_actions/types'

export default function(state={}, action){

    switch (action.type) {
        case INSERT_ACCOUNT:
            return {...state, loginSuccess: action.payload};
        default:
            return state;
            
    }
}