const express = require('express');
const http = require('http');  // Import http module
const path = require('path');
const mongoose = require('mongoose')
const socketIo = require('socket.io');
const cors = require('cors');
const {addPlayer, removePlayer} = require('./models/Room')
const {Room }= require('./models/Room')

const roomRoute = require('./routes/roomRoutes.js')
const userRoute = require('./routes/userRoute.js')
const occupantRoute = require('./routes/occupantRoute.js')

const app = express();
const server = http.createServer(app);  // Create an HTTP server
const io = socketIo(server, {
    cors: {
        origin: [`http://localhost:5173`]
    }
});  // Attach Socket.IO to the server

const PORT = 3001;

var rooms = []
var users = []

io.on('connection', (socket) => {
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
        console.log(data)
        for(i=0;i<data.length;i++){
            socket.join(data[i])
        }
    })





    socket.on('send_message', (data)=>{
        console.log(data)
        io.to(data.room).emit('chat_message', data)
    })

    socket.on('disconnect', () => {
        const dcUserIndex = users.findIndex(user => user.socket_id === socket.id);
        if (dcUserIndex !== -1) {
            const disconnectedUser = users[dcUserIndex];
            
            let update = removePlayer(rooms, disconnectedUser.username)
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].size === 0) {
                    rooms.splice(i, 1);
                    i--; // Decrement i to account for the removed element
                }
            }
            console.log(rooms)
            io.to(update.room_id).emit('new_player', update.newList)
            users.splice(dcUserIndex, 1);
            console.log(`User ${disconnectedUser.username} disconnected from room ${disconnectedUser.room_id}`)
        } else {
            console.log("Unknown user disconnected", socket.id);
        }
    });
    
});

//middleware
app.use(cors())
app.use(express.json())

//api to access db
app.use("/api/room", roomRoute)
app.use("/api/user", userRoute)
app.use("/api/occupant", occupantRoute)


app.get('/', (req, res) => {
    res.send('Working');
});

mongoose.connect("mongodb+srv://marcushjf:Mzemrej9rOfKoDgx@backenddb.hh4ttxn.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
    .then(()=>{
        console.log("Connected to database")
        server.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch(()=>{
        console.log("Connection failed")
    })

    