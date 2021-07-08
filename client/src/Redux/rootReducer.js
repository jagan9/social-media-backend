import { combineReducers } from 'redux';
import { UserReducer } from './Reducers/UserReducer';
import { postReducer } from "./Reducers/postReducer";

export default combineReducers({
    User: UserReducer,
    posts: postReducer
});