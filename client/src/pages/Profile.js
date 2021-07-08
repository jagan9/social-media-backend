import React, { useState } from 'react';
import { Paper, TextField, Snackbar } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PostImg from '../components/PostImg';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


function Profile(props) {

    let history = useHistory();

    const [model, setModel] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [nameError, setNameError] = useState(null);
    const [textError, setTextError] = useState(null);
    const [snackText, setSnackText] = useState("");
    const [valid, setValid] = useState(false);
    const [name, setName] = useState("");
    const [imgChange, setImageChange] = useState(false);

    const handleModelclose = () => {
        setModel(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const uploadImageURL = (item) => {
        try {
            return URL.createObjectURL(item)
        } catch (error) {
            return item
        }
    }

    const updateProfile = () => {
        if (imgChange) {
            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', "SocialMedia");
            data.append('cloud_name', "djqrcbjmu");

            fetch("	https://api.cloudinary.com/v1_1/djqrcbjmu/image/upload", {
                method: "post",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    const Data = {};
                    Data["bio"] = text;
                    Data["name"] = name;
                    Data["img"] = data.url;
                    props.updateProfile(Data, () => {
                        setOpen(true);
                        setSnackText("Posted yayu");
                        setImage(null);
                        setText("");
                        setName("");
                        setModel(false);
                        setOpen(false);
                    });
                })
        }
        else if (valid) {
            const Data = {};
            Data["bio"] = text;
            Data["name"] = name;
            Data["img"] = image;
            props.updateProfile(Data, () => {
                setOpen(true);
                setSnackText("Posted yayu");
                setImage(null);
                setText("");
                setName("");
                setModel(false);
                setOpen(false);
            });
        } else {
            setModel(false);
        }
    }

    const handleEdit = (user) => {
        setModel(true);
        setImage(user.img);
        setName(user.name)
        setText(user.bio);
    }

    return (
        <div>
            {
                props.data && props.posts ?
                    <div style={{ margin: "30px auto", maxWidth: "600px" }}>
                        <Paper elevation={3} style={{ padding: "20px 10px", margin: "10px" }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <img alt="logo" src={props.data.img} height="120px" width="120px" style={{ objectFit: "cover", borderRadius: "50%", marginRight: "10px" }} />
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                                    <b style={{ fontSize: "22px", marginBottom: "8px" }}>{props.posts.length}</b>
                                    <h4>Posts</h4>
                                </div>
                                <div onClick={() => history.push(`/friends/followers`)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                                    <b style={{ fontSize: "22px", marginBottom: "8px" }}>{props.data.followers.length}</b>
                                    <h4>Followers</h4>
                                </div>
                                <div onClick={() => history.push(`/friends/following`)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                                    <b style={{ fontSize: "22px", marginBottom: "8px" }}>{props.data.following.length}</b>
                                    <h4>Following</h4>
                                </div>
                            </div><br />
                            <div>
                                <h2>{props.data.name}</h2>
                                <p style={{ maxWidth: "250px", margin: "7px 0px" }}>{props.data.bio}</p>
                                <Button onClick={() => handleEdit(props.data)} variant="outlined" size="small" fullWidth>Edit Profile</Button>
                            </div>
                            <br />
                            <hr />
                            <br />
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} >
                                {
                                    props.posts.map((post, index) => {
                                        return <PostImg key={index} post={post} />
                                    })
                                }
                            </div>
                        </Paper>
                        <Dialog onClose={handleModelclose} aria-labelledby="customized-dialog-title" open={model}>
                            <DialogTitle id="customized-dialog-title" onClose={handleModelclose}>
                                <b>PROFILE</b>
                            </DialogTitle>
                            <DialogContent dividers>
                                <input type="file" onChange={(e) => { setImage(e.target.files[0]); setValid(true); setImageChange(true) }} /><br /><br />
                                <img width="300px" height="300px" style={{ textAlign: "center", objectFit: "cover", cursor: "pointer" }} alt="img" src={uploadImageURL(image)} />
                                <br /><br />
                                <TextField
                                    error={nameError !== null}
                                    helperText={nameError}
                                    label="Name"
                                    fullWidth
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); setValid(true) }}
                                />
                                <br />
                                <br />
                                <TextField
                                    error={textError !== null}
                                    helperText={textError}
                                    label="About"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    variant="outlined"
                                    value={text}
                                    onChange={(e) => { setText(e.target.value); setValid(true) }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={() => updateProfile()} color="primary">
                                    Update Post
                                </Button>
                            </DialogActions>
                        </Dialog>
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
                    </div> :
                    <h2 style={{ textAlign: "center" }}>loading....</h2>
            }

        </div>
    )
}

export default Profile
