import React, { useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { Paper } from "@material-ui/core";
import logo1 from '../Media/logo1.jpg';
import Button from '@material-ui/core/Button';
import PostImg from '../components/PostImg';
const axios = require('axios');

function UserProfile(props) {
    const [user, setUser] = React.useState(null);
    let { id } = useParams();
    let history = useHistory();


    useEffect(async () => {
        axios.get(`/api/auth/getuser/${id}`)
            .then(res => {
                setUser(res.data);
                if (props?.currentUser?._id === res.data.user._id) {
                    history.replace('/profile')
                }
            })
    }, []);

    return (
        <div>
            {
                user ?
                    <>
                        <div style={{ margin: "30px auto", maxWidth: "600px" }}>
                            <Paper elevation={3} style={{ padding: "20px 10px", margin: "10px" }}>
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <img alt="logo" src={user?.user?.img} height="120px" width="120px" style={{ objectFit: "cover", borderRadius: "50%", marginRight: "10px" }} />
                                    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
                                        <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                                                <b style={{ fontSize: "22px", marginBottom: "8px" }}>{user.posts.length}</b>
                                                <h4>Posts</h4>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                                                <b style={{ fontSize: "22px", marginBottom: "8px" }}>{user.user.followers.length}</b>
                                                <h4>Followers</h4>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                                                <b style={{ fontSize: "22px", marginBottom: "8px" }}>{user.user.following.length}</b>
                                                <h4>Following</h4>
                                            </div>
                                        </div>
                                        {
                                            props.currentUser && props.currentUser._id !== id &&
                                            <div style={{ marginTop: "15px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                <Button
                                                    onClick={() => props.handleFollow(id)}
                                                    size="small"
                                                    style={{ marginRight: "10px" }}
                                                    fullWidth
                                                    variant="outlined">
                                                    {props.currentUser.following.some(res => res._id === id) ? "Unfollow" : "Follow"}
                                                </Button>
                                                <Button
                                                    onClick={() => history.push(`/message/${user.user._id}`)}
                                                    size="small"
                                                    fullWidth
                                                    variant="outlined">
                                                    Message
                                                </Button>
                                            </div>
                                        }

                                    </div>
                                </div><br />
                                <div>
                                    <h2>{user.user.name}</h2>
                                    <p style={{ maxWidth: "250px", margin: "7px 0px" }}>{user?.user?.bio}</p>
                                </div>
                                <br />
                                <hr />
                                <br />
                                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} >
                                    {
                                        user.posts.map((post, index) => {
                                            return <PostImg key={index} post={post} />
                                        })
                                    }
                                </div>
                            </Paper>
                        </div>
                    </> :
                    <h2 style={{ textAlign: "center", marginTop: "30px" }}>loading...</h2>
            }
        </div >
    )
}

export default UserProfile
