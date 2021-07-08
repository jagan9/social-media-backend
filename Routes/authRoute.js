const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/RegistrationModel');
const Post = require('../Models/PostModel');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

//register
router.post('/registor', async (req, res) => {
    // console.log(req.body)
    // req.body.userId = "";
    // req.body.password = "12345678";
    // req.body.name = "bala";
    // req.body.email = "bala@g.com";
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            img: req.body.img,
            bio: req.body.bio
        }

        const isuser = await User.findOne({ email: req.body.email });

        if (isuser) {
            return res.status(401).json("User already registered");
        } else {
            //hash password using bcrypt
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;

            //save user
            const newUser = await new User(user);
            const savedUser = await newUser.save();

            const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SCERET_KEY);
            //console.log(token)
            //send user
            res.status(200).json({ token, user: savedUser });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("An error occured at backend");
    }
});

//login user
router.post('/login', async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        const user = await User.findOne({ email: email }).populate('saved').populate('following').populate('followers');
        !user && res.status(400).json("invalid email");

        const validPass = await bcrypt.compare(password, user.password);

        !validPass && res.status(400).json("invalid password");

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SCERET_KEY);
        //console.log(token)
        //send user
        res.status(200).json({ token, user: user });
    } catch (err) {
        console.log(err);
        res.status(500).json("An error occured at backend");
    }

});

router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }).populate('saved').populate('followers').populate('following');
        if (!user) res.status(400).json("user not found");
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/getuser/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('saved').populate('following').populate('followers');
        const posts = await Post.find({ postedBy: { $in: [req.params.id] } });
        if (!user) return res.json({ msg: "user not found" });
        res.status(200).json({ user: user, posts: posts });
    } catch (err) {
        console.log(err);
        res.status(500).json("error occured at 153");
    }
})

router.put('/follow/:id', auth, async (req, res) => {
    try {
        const findUser = await User.findOne({ _id: req.user._id });
        if (!findUser) return res.status(400).json("post not found");
        if (!findUser.following.includes(req.body.id)) {
            const pushUserID = await User.findByIdAndUpdate(req.user._id, { $push: { following: req.body.id } }, { new: true }).populate('saved').populate('following').populate('followers');
            const setFollowers = await User.findByIdAndUpdate(req.body.id, { $push: { followers: req.user._id } }, { new: true }).populate('saved').populate('following').populate('followers');
            res.status(200).json(pushUserID);
        }
        else {
            const pullUserID = await User.findByIdAndUpdate(req.user._id, { $pull: { following: req.body.id } }, { new: true }).populate('saved').populate('following').populate('followers');
            const setFollowers = await User.findByIdAndUpdate(req.body.id, { $pull: { followers: req.user._id } }, { new: true }).populate('saved').populate('following').populate('followers');
            res.status(200).json(pullUserID);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("error occured while liking a post");
    }
});

router.get('/allusers', auth, async (req, res) => {
    try {
        const users = await User.find().populate('saved').populate('following').populate('followers');;
        res.status(200).json(users)
    } catch (err) {
        console.log(err);
        res.status(500).json("error occured");
    }
})

router.put('/update_user', auth, async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        res.status(200).send(updateUser)
    } catch (err) {
        console.log(err);
        res.status(500).send("error occured");
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id }).populate('saved').populate('following').populate('followers');
        if (!user) return res.status(401).json("user not found");
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json("error occured at getting user")
    }
})

module.exports = router;