import React from 'react';
import { useHistory } from 'react-router-dom';

function PostImg(props) {
    let history = useHistory();

    const handleClick = (id) => {
        history.push(`/saved/${id}`);
    }

    return (
        <div style={{ padding: "10px" }}>
            <img onClick={() => handleClick(props.post._id)}
                alt="post"
                src={props.post.img}
                style={{ objectFit: "cover", height: "165px", width: "165px", cursor: "pointer" }} />
        </div>
    )
}

export default PostImg;
