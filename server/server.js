const express = require('express');
const http = require('http');  // Import http module
const path = require('path');
const mongoose = require('mongoose')
const socketIo = require('socket.io');
const cors = require('cors');
const {addPlayer, removePlayer} = require('./models/Room')
const {Room }= require('./models/Room')
require('dotenv').config()

const roomRoute = require('./routes/roomRoutes.js')
const userRoute = require('./routes/userRoute.js')
const occupantRoute = require('./routes/occupantRoute.js')
const segmentRoute = require('./routes/segmentRoute.js')
const taskRoute = require('./routes/taskRoute.js')
const chatRoute = require('./routes/chatRoute.js')

const app = express();
const server = http.createServer(app);  // Create an HTTP server
const io = socketIo(server, {
    cors: {
        origin: '*'
    }
});  // Attach Socket.IO to the server

//env variables
const PORT = process.env.PORT;
const MONGO = process.env.MONGO;

io.on('connection', (socket) => {
    io.to(socket.id).emit('login')
    console.log('A user connected:', socket.id);

    socket.on('req_rooms',()=>{
        io.to(socket.id).emit('init')
    })

    socket.on('join', (data) => {
        console.log(`${data.username} joined room: ${data.room_name}`);
        socket.join(data.room_name);
        io.to(data.room_name).emit('res_rooms');
    });

    socket.on('leave', (data) => {
        console.log(`${data.username} left room: ${data.room_name}`);
        socket.leave(data.room_name);
        io.to(data.room_name).emit('res_rooms');
        io.to(socket.id).emit('res_rooms')
    });

    socket.on('socket_connect', (data)=>{
        for(i=0;i<data.length;i++){
            socket.join(data[i])
        }
    })

    socket.on('req_segments', ()=>{
        io.to(socket.id).emit('res_segments')
        io.to(socket.id).emit('res_tasks')
        io.to(socket.id).emit('res_chats')
        io.to(socket.id).emit('res_users')
    })

    socket.on('add_task', (data)=>{
        io.to(data.room_name).emit('res_tasks')
    })

    socket.on('add_segment', (data)=>{
        io.to(data.room_name).emit('res_segments')
    })

    socket.on('add_chat',(data)=>{
        io.to(data.room_name).emit('res_chats')
    })

    socket.on('add_user',(data)=>{
        io.to(data.room_name).emit('res_users')
    })

    socket.on('disconnect', () => {
        console.log("Unknown user disconnected", socket.id);
    });
    
});

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//api to access db
app.use("/api/room", roomRoute)
app.use("/api/user", userRoute)
app.use("/api/occupant", occupantRoute)
app.use("/api/segment", segmentRoute)
app.use("/api/task", taskRoute)
app.use("/api/chat", chatRoute)


app.get('/', (req, res) => {
    res.send('Working');
});

mongoose.connect(MONGO)
    .then(()=>{
        console.log("Connected to database")
        server.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch(()=>{
        console.log("Connection failed")
    })

    