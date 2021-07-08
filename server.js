const express = require('express');
const app = express();
// const http = require('http');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const AuthRoute = require('./Routes/authRoute');
const ConversationRoute = require('./Routes/conversationRoute');
const MessageRoute = require('./Routes/messageRoute');
const PostRoute = require('./Routes/PostRoute');
const cors = require('cors');

// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });

require('dotenv').config();
app.use(express.json());
app.use(cors());

const URI = process.env.MONGO_URI;
mongoose.set('useCreateIndex', true);

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useFindAndModify: false }).then(() => {
    console.log("connected to mongodb");
}).catch((err) => {
    console.log(err);
});

// let users = [];
// const addUser = (userId, socketId) => {
//     !users.some(user => user.userId === userID) &&
//         users.push({ userId, socketId })
// }

// const getUser = (userId) => {
//     return users.find(user => user.userId === userId)
// }

// const removeUser = (userId) => {
//     users = users.filter(user => user.userId !== userId)
// }

// //scoket.io
// io.on('connection', (socket) => {

//     socket.on('adduser', (userId) => {
//         addUser(userId, socket.id);
//     });

//     socket.on('sendMessage', ({ senderId, receiverId, text }) => {
//         const user = getUser(receiverId);
//         io.to(user.socketId).emit("getMessage", {
//             senderId,
//             text
//         })
//     })

//     socket.on('disconect', () => {
//         removeUser(socket.id);
//     });
// });


//Routes
app.use('/api/conversation', ConversationRoute);
app.use('/api/message', MessageRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/post', PostRoute);

//listening to app
app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
});