const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
    desc: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        required: true,
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{
        text: String,
        commentedBy: {
            type: ObjectId,
            ref: "User",
        }
    }]
},
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;