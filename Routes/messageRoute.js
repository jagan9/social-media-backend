const express = require('express');
const router = express.Router();
const Message = require('../Models/Message');


router.post('/', async (req, res) => {
    const message = new Message({
        conversationId: req.body.conversationId,
        sender: req.body.sender,
        text: req.body.text
    });
    try {
        const saveMessage = await message.save();
        res.status(200).json(saveMessage);
    } catch (err) {
        console.log(err);
        res.status(500).json("error occured at posting conversation")
    }
});

router.get('/:conversationId', async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages);
    } catch (Err) {
        console.log(Err);
        res.status(500).json("error occured at fetching messages");
    }
})

module.exports = router;