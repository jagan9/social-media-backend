const express = require('express');
const router = express.Router();
const Conversations = require('../Models/Conversations');

router.post('/', async (req, res) => {
    const conversation = new Conversations({
        members: [req.body.senderId, req.body.receiverId]
    });
    try {
        const valid = await Conversations.find({
            members: { $all: [req.body.senderId, req.body.receiverId] }
        })
        if (valid.length > 0) {
            res.status(200).json(valid)
        } else {
            const saveConversation = await conversation.save();
            res.status(200).json(saveConversation);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("error occured at posting conversation")
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const conversations = await Conversations.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json(conversations);
    } catch (err) {
        console.log(err);
        res.status(500).json("error occured at getting conversations of a user");
    }
})

module.exports = router;