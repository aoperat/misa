import {
    INSERT_ACCOUNT,
    RETRIEVE_ACCOUNT,
    UPDATE_ACCOUNT,
    DELETE_ACCOUNT
} from '../_actions/types';

const accountReducer = (state = {}, action) => {
    switch (action.type) {
        case INSERT_ACCOUNT:
            return { ...state, insertSuccess: action.payload };
        case RETRIEVE_ACCOUNT:
            return { ...state, retrieveSuccess: action.payload };
        case UPDATE_ACCOUNT:
            return { ...state, updateSuccess: action.payload };
        case DELETE_ACCOUNT:
            return { ...state, deleteSuccess: action.payload };
        default:
            return state;
    }
};

export default accountReducer;
