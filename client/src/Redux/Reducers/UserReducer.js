import {
    REGISTOR_USER,
    LOGIN_USER,
    USER_ERROR,
    LOADING,
    IS_AUTHAROIZED,
    NOT_AUTHORIZED,
    LOGOUT_USER
} from '../ActionTypes';

const initState = {
    user: null,
    userError: null,
    loggedIn: false,
    loading: false,
    isAuthorized: false,
    snackShow: false,
    snackmsg: null,
    show_user: null,
    user_profile: {}
}


export const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case REGISTOR_USER:
            return {
                ...state,
                user: action.payload,
                loggedIn: true,
                isAuthorized: true,
                loading: false
            };
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                loggedIn: true,
                isAuthorized: true,
                loading: false
            }
        case USER_ERROR:
            return {
                ...state,
                userError: action.payload,
                loading: false
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case IS_AUTHAROIZED:
            return {
                ...state,
                isAuthorized: true,
                loggedIn: true,
                loading: false,
                user: action.payload
            }
        case NOT_AUTHORIZED:
            return {
                ...state,
                isAuthorized: false,
                loading: false,
                loggedIn: false
            }
        case LOGOUT_USER: {
            return {
                ...state,
                user: null,
                userError: null,
                loggedIn: false,
                loading: false,
                isAuthorized: false
            }
        }
        case "SAVE":
            return {
                ...state,
                user: action.payload[0]
            }
        case "SNAK_TRUE":
            return {
                ...state,
                snackShow: true,
                snackmsg: action.payload
            }
        case "SNAK_FALSE":
            return {
                ...state,
                snackShow: false,
                snackmsg: action.payload
            }
        case "USER_PROFILE":
            console.log(action.payload)
            return {
                ...state,
                user_profile: action.payload
            }
        case "FOLLOW_UNFOLLOW":
            state.user.following = action.payload.following;
            return {
                ...state
            }
        case "UPDATE_PROFILE":
            state.user = action.payload;
            return {
                ...state
            }
        default:
            return state;
    }
}