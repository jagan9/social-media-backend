import React, { useState, useEffect } from 'react';
import Post from '../components/post';
import { Paper, TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

function Home(props) {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const [textError, setTextError] = useState(null);
    const [open, setOpen] = useState(false);
    const [snackText, setSnackText] = useState("");


    const handleClose = () => {
        setOpen(false)
    }

    const uploadImageURL = (item) => {
        try {
            return URL.createObjectURL(item)
        } catch (error) {
            return item
        }
    }

    useEffect(() => {
        setImage(null);
        setText("");
    }, [])

    const PostDetails = () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', "SocialMedia");
        data.append('cloud_name', "djqrcbjmu");

        let validData = true;

        if (text.length < 2) {
            validData = false;
            setTextError("At least two letters")
        } else {
            validData = true;
            setTextError(null);
        }

        if (image === null) {
            validData = false;
            setOpen(true);
            setSnackText("image Required")
        } else {
            validData = true;
            setOpen(false);
        }

        if (validData) {
            setOpen(true);
            setSnackText("Posting...");
            fetch("	https://api.cloudinary.com/v1_1/djqrcbjmu/image/upload", {
                method: "post",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    const Data = {};
                    Data["desc"] = text;
                    Data["img"] = data.url
                    setOpen(true);
                    setSnackText("Posted yayu");
                    setImage(null);
                    setText("");
                    props.createPost(Data)
                })
                .catch(err => console.log(err));
        }
    }


    if (props.loading) {
        return <h1 style={{ textAlign: "center" }}>Loading....</h1>
    }

    return (
        <div>
            <div style={{ maxWidth: "600px", margin: "20px auto" }}>
                <Paper elevation={3} style={{ padding: "20px 10px" }}>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    <button onClick={() => PostDetails()} style={{ borderRadius: "5px", cursor: "pointer", padding: "10px 20px", backgroundColor: "MediumSeaGreen", float: "right", border: "none", color: "#fff" }} >Post It</button>
                    <br /><br /><br />
                    {
                        image &&
                        <img style={{ width: "100%", height: "350px" }} src={uploadImageURL(image)} />
                    }
                    <br /><br />
                    <TextField
                        error={textError !== null}
                        helperText={textError}
                        label="Enter Text"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Paper>
            </div>
            {props.posts.map((post, index) => (
                <Post
                    updatePost={(id, data) => props.updatePost(id, data)}
                    userId={props.userid}
                    deletePost={(id) => props.deletePost(id)}
                    post={post}
                    key={index}
                    commentPost={(text, userId, postId) => props.commentPost(text, userId, postId)}
                    like={(id) => props.like(id)}
                    save={(id) => props.save(id)} />
            ))}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={snackText}
            />

        </div>
    )
}

export default Home;
