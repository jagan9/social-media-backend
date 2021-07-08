import React from 'react';
import { Redirect } from 'react-router-dom';

function Auth(props) {

    if (props.home === "home") {
        if (localStorage.getItem("token")) {
            return props.children;
        }
        else {
            return <Redirect to="/signup" />
        }
    }

    if (props.data.user !== null && !props.data.loggedIn) {
        return <div style={{ textAlign: "center" }}>Loading....</div>;
    }
    if (!localStorage.getItem("token")) {
        return props.children;
    } else {
        return <Redirect to="/" />
    }
}

export default Auth;
