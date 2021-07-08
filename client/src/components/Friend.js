import React from 'react';
import { useHistory } from 'react-router-dom';

function Friend(props) {
    let history = useHistory();

    return (
        <div style={{ padding: "10px 0px" }}>
            <div onClick={() => history.push(`/user/${props.data._id}`)} style={{ cursor: "pointer", display: "flex", flexDirection: "row" }}>
                <div>
                    <img alt="logo" src={props?.data?.img} height="55px" width="55px" style={{ objectFit: "cover", borderRadius: "50%", marginRight: "10px" }} />
                </div>
                <div>
                    <b>{props.data.name}</b><br />
                    <span>{props?.data?.bio}</span>
                </div>
            </div>
        </div>
    )
}

export default Friend
