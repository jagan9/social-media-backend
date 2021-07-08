import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChatUser(props) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            let userID = props.conv.members.find(user => user !== props.currentUser._id);
            const user = await axios.get(`/api/auth/user/${userID}`);
            setUser(user.data[0])
        }

        getUser();
    }, [])
    return (
        <div>
            {
                user &&
                <div style={{
                    display: "flex",
                    marginTop: "15px",
                    cursor: "pointer",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <img
                        src={user.img}
                        alt="pic"
                        style={{ borderRadius: "50%", marginRight: "15px", objectFit: "cover" }}
                        height="50px"
                        width="50px" />
                    <b style={{ fontSize: "23px" }}>{user.name}</b>
                </div>
            }
        </div>
    )
}

export default ChatUser
