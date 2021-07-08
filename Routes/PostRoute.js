const express = require("express");
const router = express.Router();
const Post = require('../Models/PostModel');
const User = require('../Models/RegistrationModel');
const auth = require('../middleware/auth');

router.post('/createpost', auth, async (req, res) => {
    console.log(req.body)
    // req.body.desc = "my name is bala";
    // req.body.img = "https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&rect=9%2C0%2C2994%2C1999&q=45&auto=format&w=496&fit=clip";
    // req.body.postedBy = req.user._id;
    // req.body.postedBy = "60c8ad7b8274772cbcb86f61";
    try {

        const post = {
            desc: req.body.desc,
            img: req.body.img,
            postedBy: req.user._id
        }

        const Newpost = new Post(post);
        const savedPost = await Newpost.save();
        const findPost = await Post.find({ _id: savedPost._id })
            .populate('postedBy')
            .populate('comments');
        res.status(200).json(findPost);
    } catch (err) {
        console.log(err);
        res.status(500).json("an Error occured");
    }
});

router.delete('/deletepost/:id', auth, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("successfully deleted");
    } catch (err) {
        console.log(err);
        res.status(500).json("an error occured at backend");
    }
});

router.put('/updatepost/:id', auth, async (req, res) => {
    // req.body.desc = "bala";
    // req.body.img = "klkhjghaSAFDSGDF";

    try {
        const toUpdate = {
            desc: req.body.desc,
            img: req.body.img
        }
        const updatingPost = await Post.findByIdAndUpdate(req.params.id, toUpdate, { new: true });
        res.status(200).json(updatingPost);
    } catch (err) {
        console.log(err);
        res.status(500).json("error occured at updating post");
    }
});

router.get('/allposts', auth, async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('postedBy')
            .populate('comments.commentedBy')
            .sort('-createdAt');
        res.status(200).json(posts);
    } catch (err) {
        console.log(err)
        res.status(500).json("error occured while fetching all posts");
    }
})


router.get('/myposts', auth, async (req, res) => {
    // req.body._id = "60c8ad7b8274772cbcb86f61";
    try {
        const myPosts = await Post.find({ postedBy: req.user._id });
        res.status(200).json(myPosts);
    } catch (err) {
        console.log(err);
        res.status(500).json("error occured while fetching my posts");
    }
});

router.post('/like/:id', auth, async (req, res) => {
    //req.body._id = "60c8ad7b8274772cbcb86f61";
    //console.log(req.params.id);
    try {
        const findPost = await Post.findOne({ _id: req.params.id });
        if (!findPost) return res.status(400).json("post not found");
        if (!findPost.likes.includes(req.user._id)) {
            const pushUserID = await Post.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } }, { new: true });
            res.status(200).json(pushUserID);
        }
        else {
            const pullUserID = await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true });
            res.status(200).json(pullUserID);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("error occured while liking a post");
    }
});

router.post('/comment/:id', async (req, res) => {
    // req.body.text = "bala";
    // req.body.userId = "60c8ad7b8274772cbcb86f61";

    try {
        const addComment = await Post.findByIdAndUpdate(req.params.id,
            {
                $push:
                {
                    comments:
                    {
                        text: req.body.text, commentedBy: req.body.userId
                    }
                }
            },
            { new: true })
            .populate('postedBy')
            .populate('comments.commentedBy');
        res.status(200).json(addComment);
    } catch (err) {
        console.log(err);
        res.status(500).json("error occured while commenting a post");
    }
});

router.post('/save/:id', auth, async (req, res) => {
    //req.body._id = "60c8ad7b8274772cbcb86f61";
    //console.log(req.params.id);
    try {
        const findUser = await User.findOne({ _id: req.user._id });
        if (!findUser) return res.status(400).json("user not found");
        if (!findUser.saved.includes(req.params.id)) {
            const pushUserID = await User.findByIdAndUpdate(req.user._id, { $push: { saved: req.params.id } }, { new: true });
            const userPost = await User.find({ _id: req.user._id }).populate('saved');
            res.status(200).json(userPost);
        }
        else {
            const pullUserID = await User.findByIdAndUpdate(req.user._id, { $pull: { saved: req.params.id } }, { new: true }).populate('saved');
            const userPost = await User.find({ _id: req.user._id }).populate('saved');
            res.status(200).json(userPost);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json("error occured while liking a post");
    }
});


module.exports = router;