import React, { useEffect } from 'react';
import axios from 'axios';
import Friend from '../components/Friend';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

function AllUsers() {

    const [allusers, setAllUsers] = React.useState(null);
    const [users, setUsers] = React.useState(null);
    const [searchText, setSearchtext] = React.useState("");

    useEffect(async () => {
        const token = localStorage.getItem("token");
        const users = await axios.get('/api/auth/allusers', {
            headers: {
                "x-auth-token": token
            }
        });
        setUsers(users.data);
        setAllUsers(users.data);

    }, []);

    const searchUser = () => {
        if (searchText === "") {
            setUsers(allusers)
        } else {
            const search = allusers.filter(user => user.name.includes(searchText))
            setUsers(search)
        }
    }
    return (
        <div style={{ maxWidth: "600px", margin: "20px auto" }}>
            <Paper elevation={3} style={{ padding: "20px", margin: "10px" }}>
                <form onSubmit={(e) => { e.preventDefault(); searchUser(e) }}>
                    <Input
                        value={searchText}
                        autoComplete="off"
                        onChange={(e) => setSearchtext(e.target.value)}
                        fullWidth
                        placeholder="search friend..."
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="end">
                                < SearchIcon />
                            </InputAdornment>
                        }
                    ></Input>
                    <button type="submit" style={{ display: "none" }}></button>
                </form>
                {
                    users ?
                        users.length !== 0 ?
                            users.map(user => (
                                <Friend key={user._id} data={user} />
                            )) :
                            <h2 style={{ textAlign: "center" }}>no users</h2>
                        :
                        <h2 style={{ width: "100%", textAlign: "center" }}>loading...</h2>
                }
            </Paper>
        </div>
    )
}

export default AllUsers
