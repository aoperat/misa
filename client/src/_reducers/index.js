import { combineReducers } from "redux";
import user from './user_reducer';
import account from './account_reducer'


const rootReducer = combineReducers({
    user,account
})

export default rootReducer;