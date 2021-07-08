import React, { useEffect } from 'react';
import Friend from '../components/Friend';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div >{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "white",
    },
}));

function Follow(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (props.toShow === "one") {
            setValue('one');
        } else {
            setValue('two');
        }
    }, [])

    return (
        <div style={{ maxWidth: "600px", margin: "20px auto" }}>
            <Paper elevation={3} style={{ padding: "20px", margin: "10px" }}>
                <div className={classes.root}>
                    <AppBar style={{ backgroundColor: "#fff", color: "black", marginTop: "15px" }} position="static">
                        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                            <Tab
                                value="one"
                                label="Followers"
                                wrapped
                                {...a11yProps('one')}
                            />
                            <Tab value="two" label="Following" {...a11yProps('two')} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index="one">
                        {
                            props.data ?
                                props.data.followers.length === 0 ?
                                    <div style={{ textAlign: "center" }}>No Followers</div> :
                                    props.data.followers.map((follower, index) => (
                                        <Friend key={index} data={follower} />
                                    )) :
                                <div style={{ textAlign: "center" }}>Loading...</div>
                        }
                    </TabPanel>
                    <TabPanel value={value} index="two">
                        {
                            props.data ?
                                props.data.following.length === 0 ?
                                    <div style={{ textAlign: "center", fontSize: "27px" }}>No Following</div> :
                                    props.data.following.map((follower, index) => (
                                        <Friend key={index} data={follower} />
                                    )) :
                                <div style={{ textAlign: "center", fontSize: "27px" }}>Loading...</div>
                        }
                    </TabPanel>
                </div>
            </Paper>
        </div>
    )
}

export default Follow
