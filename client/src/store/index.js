import { combineReducers } from 'redux'
import { reducer as userReducer } from './userReducer'

export default combineReducers({
    user:userReducer
})