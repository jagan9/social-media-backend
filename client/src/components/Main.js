import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Header from '../components/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from '../auth';
import { connect } from 'react-redux';
import { RegisterUser, LoginUser, LoadUser, LogoutUser, handleFollow, offSnackuser, updateProfile } from '../Redux/Actions/UserAction';
import { LoadPosts, likeAndUnlikePost, savePost, offSnack, createPost, commentPost, updatePost, deletePost } from '../Redux/Actions/postAction';
import React, { useEffect, useState } from 'react';
import Profile from '../pages/Profile';
import SavedPosts from '../pages/savedPosts';
import Singlepost from '../pages/Singlepost';
import AllUsers from '../pages/AllUsers';
import UserProfile from '../pages/userProfile';
import Follow from '../pages/Follow';
import Messenger from '../pages/Messenger';
import Snackbar from '@material-ui/core/Snackbar';

function Main(props) {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);

    const handleClose = () => {
        props.offSnackuser();
        props.offSnack();
    };

    useEffect(() => {
        props.LoadUser(() => setUser((user) => user));
        props.LoadPosts(() => setPosts(props.posts));
    }, []);

    return (

        <div className="App">
            <Header
                data={props.user}
                LogoutUser={() => props.LogoutUser()} />
            <Switch>

                <Route exact path="/">
                    <Auth home="home" data={props.user}>
                        <Home
                            commentPost={(text, userId, postId) => props.commentPost(text, userId, postId)}
                            userid={props.user.user ? props.user.user._id : null}
                            posts={props.posts.posts}
                            loading={props.posts.loading}
                            like={(id) => props.likeAndUnlikePost(id)}
                            save={(id) => props.savePost(id)}
                            deletePost={(id) => props.deletePost(id)}
                            updatePost={(id, data) => props.updatePost(id, data)}
                            createPost={(data) => props.createPost(data)} />
                    </Auth>
                </Route>

                <Route exact path="/login">
                    <Auth data={props.user}>
                        <Login
                            data={props.user}
                            LoginUser={(details) => props.LoginUser(details)} />
                    </Auth>
                </Route>

                <Route exact path="/signup">
                    <Auth data={props.user}>
                        <Signup
                            data={props.user}
                            RegisterUser={(details) => props.RegisterUser(details)} />
                    </Auth>
                </Route>

                <Route exact path="/profile" >
                    <Auth home="home">
                        <Profile
                            updateProfile={(data, onSuccess) => props.updateProfile(data, onSuccess)}
                            data={props.user.user ? props.user.user : null}
                            posts={(props.posts.posts && props.user.user) ? props.posts.posts.filter((post) => post.postedBy._id === props.user.user._id) : []} />
                    </Auth>
                </Route>

                <Route exact path="/saved" >
                    <Auth home="home">
                        <SavedPosts user={props.user.user} />
                    </Auth>
                </Route>

                <Route exact path="/saved/:id">
                    <Auth home="home">
                        <Singlepost
                            userId={props.user.user ? props.user.user._id : null}
                            commentPost={(text, userId, postId) => props.commentPost(text, userId, postId)}
                            posts={props.posts.posts ? props.posts.posts : []}
                            like={(id) => props.likeAndUnlikePost(id)}
                            save={(id) => props.savePost(id)} />
                    </Auth>
                </Route>

                <Route exact path="/posts/:id">
                    <Auth home="home">
                        <Singlepost
                            userId={props.user.user ? props.user.user._id : null}
                            deletePost={(id) => props.deletePost(id)}
                            commentPost={(text, userId, postId) => props.commentPost(text, userId, postId)}
                            posts={props.posts.posts ? props.posts.posts : []}
                            like={(id) => props.likeAndUnlikePost(id)}
                            save={(id) => props.savePost(id)} />
                    </Auth>
                </Route>

                <Route exact path="/user/:id" >
                    <Auth home="home">
                        <UserProfile
                            handleFollow={(id) => props.handleFollow(id)}
                            currentUser={props.user.user ? props.user.user : null} />
                    </Auth>
                </Route>

                <Route exact path="/friends/followers">
                    <Auth home="home">
                        <Follow toShow="one" data={props.user.user ? props.user.user : null} />
                    </Auth>
                </Route>

                <Route exact path="/friends/following">
                    <Auth home="home">
                        <Follow toShow="two" data={props.user.user ? props.user.user : null} />
                    </Auth>
                </Route>

                <Route exact path="/allusers">
                    <Auth home="home">
                        <AllUsers />
                    </Auth>
                </Route>

                <Route exact path="/message">
                    <Auth home="home">
                        <Messenger currentUser={props.user.user ? props.user.user : null} />
                    </Auth>
                </Route>

                <Route exact path="/message/:id">
                    <Auth home="home">
                        <Messenger
                            currentUser={props.user.user ? props.user.user : null} />
                    </Auth>
                </Route>

                <Redirect to="/" />
            </Switch>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={props.posts.snackShow || props.user.Snackbar}
                autoHideDuration={3000}
                onClose={handleClose}
                message={props.posts.snackmsg || props.posts.snackmsg}
            />

        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        LoginUser: (user) => dispatch(LoginUser(user)),
        RegisterUser: (user) => dispatch(RegisterUser(user)),
        LoadUser: (onSuccess) => dispatch(LoadUser(onSuccess)),
        LogoutUser: () => dispatch(LogoutUser()),
        LoadPosts: (onSuccess) => dispatch(LoadPosts(onSuccess)),
        likeAndUnlikePost: (id) => dispatch(likeAndUnlikePost(id)),
        savePost: (id) => dispatch(savePost(id)),
        offSnack: () => dispatch(offSnack()),
        offSnackuser: () => dispatch(offSnackuser()),
        createPost: (data) => dispatch(createPost(data)),
        deletePost: (id) => dispatch(deletePost(id)),
        updatePost: (id, data) => dispatch(updatePost(id, data)),
        handleFollow: (id) => dispatch(handleFollow(id)),
        updateProfile: (data, onSuccess) => dispatch(updateProfile(data, onSuccess)),
        commentPost: (text, userId, postId) => dispatch(commentPost(text, userId, postId))
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.User,
        posts: state.posts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

