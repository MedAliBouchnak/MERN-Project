import { combineReducers } from "redux"

import authReducer from './authReducer'
import errorsReducer from './errorsReducer'
import profileReducer from './profileReducer'
import blogReducer from './blogReducer'
export default combineReducers({
    auth: authReducer,
    errors:errorsReducer,
    profiles:profileReducer,
    blogs:blogReducer,
})