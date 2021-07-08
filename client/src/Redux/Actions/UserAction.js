import {
    REGISTOR_USER,
    LOGIN_USER,
    USER_ERROR,
    LOADING,
    IS_AUTHAROIZED,
    NOT_AUTHORIZED,
    LOGOUT_USER
} from '../ActionTypes';
import { LoadPosts } from './postAction';
const axios = require('axios');


export const RegisterUser = newuser => {
    return (dispatch, getstate) => {
        dispatch({ type: LOADING });
        axios
            .post('/api/auth/registor', newuser)
            .then(user => {
                localStorage.setItem('token', user.data.token);
                dispatch({ type: REGISTOR_USER, payload: user.data.user });
            }).catch(err => {
                dispatch({ type: USER_ERROR, payload: err.response.data })
            })
    }
}

export const LoginUser = (user) => {
    return (dispatch, getstate) => {
        dispatch({ type: LOADING });
        axios.post('/api/auth/login', user).then(user => {
            if (user.data === "invalid email") {
                dispatch({ type: USER_ERROR, payload: user.data })
            }
            else if (user.data === "invalid password") {
                dispatch({ type: USER_ERROR, payload: user.data })
            } else {
                localStorage.setItem('token', user.data.token);
                dispatch({ type: LOGIN_USER, payload: user.data.user });
                LoadUser(); LoadPosts();
            }
        }).catch(err => {
            dispatch({ type: USER_ERROR, payload: err.response.data })
        })
    }
}

export const LoadUser = (onSuccess) => {
    return (dispatch, getState) => {
        dispatch({ type: LOADING });
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get('/api/auth/user', {
                    headers: {
                        "x-auth-token": token
                    }
                })
                .then(res => {
                    onSuccess();
                    dispatch({ type: IS_AUTHAROIZED, payload: res.data });
                }).catch(err => {
                    console.log(err.response.data);
                    dispatch({ type: NOT_AUTHORIZED });
                })
        } else {
            dispatch({ type: USER_ERROR, payload: null });
        }
    }
}

export const LogoutUser = () => {
    return (dispatch, getState) => {
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT_USER });
    }
}

export const offSnackuser = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: "SNAK_FALSE", payload: null });
        } catch (err) {
            console.log(err);
        }
    }
}

export const handleFollow = (id) => {
    return async (dispatch, getstate) => {
        try {
            const token = localStorage.getItem("token");
            const user = await axios.put(`/api/auth/follow/${id}`, { id }, {
                headers: {
                    "x-auth-token": token
                }
            });
            dispatch({ type: "FOLLOW_UNFOLLOW", payload: user.data });
        } catch (err) {
            console.log(err.response.data);
        }
    }
}

export const updateProfile = (data, onSuccess) => {
    return async (dispatch, getstate) => {
        try {
            const token = localStorage.getItem("token");
            console.log("hi ")
            const updatedUser = await axios.put('/api/auth/update_user', data, {
                headers: {
                    "x-auth-token": token
                }
            });
            onSuccess();
            dispatch({ type: "UPDATE_PROFILE", payload: updatedUser.data })
        } catch (err) {
            console.log(err.response.data);
        }
    }
}
