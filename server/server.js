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
    io.emit('alert', `${socket.id} has joined the chat`)

    socket.on('join', (data) => {
        console.log(`${data.username} joining room: ${data.room_id}`);
        
        // check
        let players = addPlayer(rooms, data.room_id, data.username);
    
        if (players.length === 0) {
            io.to(socket.id).emit('join_status', false);  // Emit only to the specific socket
            return;
        }
        
        users.push({username: data.username, room_id: data.room_id, socket_id: socket.id})
        socket.join(data.room_id);
        io.to(socket.id).emit('join_status', data.room_id);
        io.to(data.room_id).emit('new_player', players);
        console.log(rooms);
    });
    

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

app.use("/api/room", roomRoute)
app.use("/api/user", userRoute)

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

    