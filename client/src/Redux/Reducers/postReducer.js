const initState = {
    posts: [],
    loading: false,
    snackShow: false,
    snackmsg: null,
}

export const postReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOAD_POSTS":
            return {
                ...state,
                loading: false,
                posts: action.payload
            };
        case "FETCHING_POST":
            return {
                ...state,
                loading: true
            };
        case "LIKE_UNLIKE":
            const id = action.payload._id;
            for (let item of state.posts) {
                if (item._id === id) {
                    item.likes = action.payload.likes;
                }
            }
            return {
                ...state,
                loading: false
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
        case "SAVEPOST":
            const posts = state.posts;
            posts.push(action.payload[0]);
            return {
                ...state,
                posts
            }
        case "COMMENT":
            const Id = action.payload._id;
            for (let item of state.posts) {
                if (item._id === Id) {
                    item.comments = action.payload.comments;
                    item.comments.reverse();
                }
            }
            return {
                ...state,
                loading: false
            }
        case "DELETE":
            const Posts = state.posts.filter(post => post._id !== action.payload);
            return {
                ...state,
                loading: false,
                posts: Posts
            }
        case "UPDATEPOST":
            const postId = action.payload.id;
            for (let item of state.posts) {
                if (item._id === postId) {
                    item.desc = action.payload.data.desc;
                    item.img = action.payload.data.img;
                }
            }
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}