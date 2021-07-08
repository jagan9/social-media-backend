const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const RegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 30,
    },
    bio: {
        type: String
    },
    img: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    saved: [{ type: ObjectId, ref: "Post" }],
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }]
},
    { timestamps: true }
);

const RegistorUser = mongoose.model("User", RegistrationSchema);

module.exports = RegistorUser;