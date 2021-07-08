import { Backdrop } from '@material-ui/core'
import React from 'react';
import logo1 from '../Media/logo1.jpg';
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import GroupIcon from '@material-ui/icons/Group';



function Header(props) {

    const [state, setState] = React.useState(false);

    const toggleDrawer = () => (event) => {
        setState(false);
    };

    const drawer = () => (
        <div
            style={{ minWidth: "250px" }}
            role="presentation"
            onClick={toggleDrawer()}
        >
            <List>
                <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem button >
                        <ListItemIcon> <AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary="My profile" />
                    </ListItem>
                </Link>

                <Link to="/saved" style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem button >
                        <ListItemIcon> <TurnedInIcon /></ListItemIcon>
                        <ListItemText primary="Saved" />
                    </ListItem>
                </Link>

                <Link to="/allusers" style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem button >
                        <ListItemIcon> <BubbleChartIcon /></ListItemIcon>
                        <ListItemText primary="All Users" />
                    </ListItem>
                </Link>

                <Link to="/friends/followers" style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem button >
                        <ListItemIcon> <BubbleChartIcon /></ListItemIcon>
                        <ListItemText primary="Followers" />
                    </ListItem>
                </Link>

                <Link to="/friends/following" style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem button >
                        <ListItemIcon> <GroupIcon /></ListItemIcon>
                        <ListItemText primary="Following" />
                    </ListItem>
                </Link>

                <Link to="/message" style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItem button >
                        <ListItemIcon> <InboxIcon /></ListItemIcon>
                        <ListItemText primary="Chat" />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => { props.LogoutUser() }}>
                    <ListItemIcon> <ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    )


    return (

        <div style={{
            padding: "15px",
            margin: "0",
            width: "100%",
            backgroundColor: "darkblue",
            color: "white",
            position: "sticky",
            top: "0",
            zIndex: "100"
        }}>

            <div style={{
                padding: "0px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <div style={{ marginRight: "0px" }}>
                    <Link to="/" style={{ textDecoration: "none", color: "#fff" }} >
                        <h1>Chat App</h1>
                    </Link>
                </div>
                <div>
                    <React.Fragment>
                        <Drawer anchor="right" open={state} onClose={toggleDrawer()}>
                            {drawer()}
                        </Drawer>
                    </React.Fragment>

                    {
                        props.data.isAuthorized &&
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                            {/* <p
                                onClick={() => props.LogoutUser()}
                                style={{
                                    textDecoration: "none",
                                    fontSize: "20px",
                                    color: "white",
                                    cursor: "pointer",
                                    marginRight: "15px",
                                }}>
                                logout
                            </p> */}

                            <img onClick={() => setState(true)} alt="logo" src={props?.data?.user?.img} height="45px" width="45px" style={{ cursor: "pointer", objectFit: "cover", borderRadius: "50%", marginRight: "10px" }} />
                        </div>
                    }

                    {
                        !props.data.isAuthorized &&
                        <>
                            <Link style={{
                                textDecoration: "none",
                                fontSize: "20px",
                                color: "white",
                                marginRight: "15px",
                            }}
                                to="/login">
                                Login
                            </Link>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    fontSize: "20px",
                                    color: "white",
                                    marginRight: "15px",
                                }}
                                to="/signup">
                                SignUp
                            </Link>
                        </>
                    }
                </div>
            </div>

        </div>
    )
}
export default Header;

