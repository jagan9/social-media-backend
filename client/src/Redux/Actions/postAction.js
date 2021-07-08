const axios = require('axios');

export const LoadPosts = (onSuccess, onError) => {
    return async (dispatch, getState) => {
        dispatch({ type: "FETCHING_POST" });
        const token = localStorage.getItem('token');
        const posts = await axios.get('/api/post/allposts', {
            headers: {
                "x-auth-token": token
            }
        });
        onSuccess();
        dispatch({ type: "LOAD_POSTS", payload: posts.data })
    }
}

export const likeAndUnlikePost = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: "SNAK_TRUE", payload: "loading...." });
            const token = localStorage.getItem("token");
            const post = await axios.post(`/api/post/like/${id}`, {}, {
                headers: {
                    "x-auth-token": token
                }
            });
            dispatch({ type: "LIKE_UNLIKE", payload: post.data });
            dispatch({ type: "SNAK_TRUE", payload: "Done...." });
        } catch (err) {
            console.log(err);
        }
    }
}

export const savePost = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: "SNAK_TRUE", payload: "loading...." });
            const token = localStorage.getItem("token");
            const post = await axios.post(`/api/post/save/${id}`, {}, {
                headers: {
                    "x-auth-token": token
                }
            });
            dispatch({ type: "SAVE", payload: post.data });
            dispatch({ type: "SNAK_TRUE", payload: "Done...." });
        } catch (err) {
            console.log(err);
        }
    }
}

export const commentPost = (text, userId, postId) => {
    return async (dispatch, getState) => {
        try {
            const token = localStorage.getItem("token");
            const post = await axios.post(`/api/post/comment/${postId}`, { text, userId }, {
                headers: {
                    "x-auth-token": token
                }
            });
            dispatch({ type: "COMMENT", payload: post.data });
        } catch (err) {
            console.log(err);
        }
    }
}

export const deletePost = (postId) => {
    return async (dispatch, getState) => {
        try {
            const token = localStorage.getItem("token");
            const post = await axios.delete(`/api/post/deletepost/${postId}`, {
                headers: {
                    "x-auth-token": token
                }
            });
            dispatch({ type: "DELETE", payload: postId });
        } catch (err) {
            console.log(err.response.data);
        }
    }
}




export const offSnack = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: "SNAK_FALSE", payload: null });
        } catch (err) {
            console.log(err);
        }
    }
}

export const createPost = (data) => {
    return async (dispatch, getState) => {
        try {
            const token = localStorage.getItem("token");
            const post = await axios.post("/api/post/createpost", data, {
                headers: {
                    "x-auth-token": token
                }
            });
            dispatch({ type: "SAVEPOST", payload: post.data })
        } catch (err) {
            console.log(err);
        }
    }
}

export const updatePost = (id, data) => {
    return async (dispatch, getState) => {
        try {
            const token = localStorage.getItem("token");
            const post = await axios.put(`/api/post/updatepost/${id}`, data, {
                headers: {
                    "x-auth-token": token
                }
            });
            const res = {
                id,
                data: post.data
            }
            dispatch({ type: "UPDATEPOST", payload: res })
        } catch (err) {
            console.log(err);
        }
    }
}