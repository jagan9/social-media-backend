import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import logo1 from '../Media/logo1.jpg';
import { Paper, Fab } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router-dom';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


function Singlepost(props) {
    let { id } = useParams();
    let history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [comtext, setComtext] = useState("")

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleComment = (text, userId, postId) => {
        props.commentPost(text, userId, postId)
        setComtext("");
    }

    const handleViewAndDelete = (id, isUser, postId) => {
        if (!isUser) {
            history.push(`/user/${id}`);
        } else {
            //console.log(postId);
            props.deletePost(postId);
            history.goBack();
            setAnchorEl(null);
        }
    }

    const handleEditAndFollow = (id, isUser, post) => {
        if (!isUser) {
            history.push(`/user/${id}`);
        } else {
            // setModel(true);
            // setpostId(post._id)
            setAnchorEl(null);
            // setImage(post.img);
            // setText(post.desc);
        }
    }


    let Post = [];
    Post = props.posts.filter((post) => post._id === id);
    if (Post.length === 0) {
        history.replace('/');
    }


    return (
        <div>
            {
                Post[0] ?
                    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
                        <Paper elevation={3} style={{ padding: "20px", margin: "10px" }}>
                            <div style={{ marginBottom: "20px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                                <div onClick={() => history.push(`/user/${Post[0].postedBy._id}`)} style={{ display: "flex", flexDirection: "row", cursor: "pointer", alignItems: "center" }}>
                                    <img alt="logo" src={Post[0]?.postedBy?.img} height="45px" width="45px" style={{ objectFit: "cover", borderRadius: "50%", marginRight: "10px" }} />
                                    <h4><b>{Post[0].postedBy.name}</b></h4>
                                </div>
                                <div>
                                    <Fab style={{ backgroundColor: "#fff", boxShadow: "none" }}>
                                        <MoreVertIcon onClick={handleClick} />
                                    </Fab>
                                </div>
                            </div>
                            <div>
                                <img width="100%" height="350px" style={{ objectFit: "cover", cursor: "pointer" }} alt="img" src={Post[0].img} />
                            </div>
                            <div style={{ marginBottom: "6px" }}>
                                <Fab size="small" style={{ backgroundColor: "#fff", boxShadow: "none", marginRight: "-2px" }}>
                                    <span style={{ fontSize: "25px" }}>{Post[0].likes.length}</span>
                                </Fab>
                                {
                                    !Post[0].likes.includes(props.userId) ?
                                        <Fab size="small" style={{ backgroundColor: "#fff", boxShadow: "none", marginRight: "0px" }}>
                                            <ThumbUpAltIcon onClick={() => props.like(Post[0]._id)} style={{ cursor: "pointer" }} />
                                        </Fab>
                                        :
                                        <Fab size="small" style={{ backgroundColor: "#fff", boxShadow: "none", marginRight: "0px" }}>
                                            <ThumbDownAltIcon onClick={() => props.like(Post[0]._id)} style={{ cursor: "pointer" }} />
                                        </Fab>
                                }
                                <Fab size="small" style={{ backgroundColor: "#fff", boxShadow: "none", marginRight: "0px" }}>
                                    <FavoriteIcon onClick={() => props.like(Post[0]._id)} style={{ cursor: "pointer" }} />
                                </Fab>
                                <Fab size="small" style={{ backgroundColor: "#fff", boxShadow: "none", float: "right", marginRight: "0px" }}>
                                    <BookmarkIcon onClick={() => props.save(Post[0]._id)} style={{ cursor: "pointer" }} />
                                </Fab>
                            </div>
                            <div style={{ marginBottom: "15px" }}>
                                <b>{Post[0].postedBy.name}</b> {Post[0].desc}
                            </div>
                            <div >
                                {Post[0].comments.map((comment, index) => (
                                    <p key={index}><span style={{ fontWeight: "bold" }}>{comment.commentedBy.name} </span>{comment.text}</p>
                                ))}
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <TextField
                                    value={comtext}
                                    onChange={(e) => setComtext(e.target.value)}
                                    fullWidth
                                    placeholder="leave comment..." />
                                <SendIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        handleComment(comtext,
                                            Post[0].postedBy._id, Post[0]._id)} />
                            </div>
                        </Paper>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => handleViewAndDelete(Post[0].postedBy._id, props.userId === Post[0].postedBy._id, Post[0]._id)}>{props.userId === Post[0].postedBy._id ? "delete post" : "view profile"} </MenuItem>
                            <MenuItem onClick={() => handleEditAndFollow(Post[0].postedBy._id, props.userId === Post[0].postedBy._id, Post[0])}>{props.userId === Post[0].postedBy._id ? "edit post" : "follow"}</MenuItem>
                        </Menu>
                    </div>
                    :
                    <h1 style={{ textAlign: "center" }}>Loading...</h1>
            }
        </div>
    )
}

export default Singlepost
