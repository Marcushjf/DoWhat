const express = require('express');
const http = require('http');  // Import http module
const path = require('path');
const socketIo = require('socket.io');
const cors = require('cors');
const { disconnect } = require('process');
const { PassThrough } = require('stream');

const app = express();
const server = http.createServer(app);  // Create an HTTP server
const io = socketIo(server, {
    cors: {
        origin: [`http://localhost:5173`]
    }
});  // Attach Socket.IO to the server

const PORT = 3001;

const items = [
    {
        name: "mike",
        age: "16"
    },
    {
        name: "mike",
        age: "16"
    },
    {
        name: "mike",
        age: "16"
    },
]

class Room {
    constructor(players, size, id) {
        this.players = players;
        this.size = size;
        this.id = id
    }

    addPlayer(player) {
        // Check if the player is already in the room
        if (!this.players.includes(player)) {
            if(this.size<4){
                this.size++;
                this.players = [...this.players, player];
            }
            else{
                console.log(`Room is already full.`);
                return false
            }    
        } else {
            console.log(`Player ${player} is already in the room.`);
            return false
        }
        return true
    }
}

function addPlayer(rooms, id, username){
    for (i=0;i< rooms.length; i++){
        if(rooms[i].id === id){
            if(rooms[i].addPlayer(username)){
                return rooms[i].players
            }
            return []
        }
    }
    let newRoom = new Room([username], 1, id)
    rooms.push(newRoom)
    return newRoom.players
}


var rooms = []

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    io.emit('alert', `${socket.id} has joined the chat`)

    socket.on('join', (data) => {
        console.log(`${data.username} joining room: ${data.room_id}`);
        
        // check
        let players = addPlayer(rooms, data.room_id, data.username);
        console.log(players)
    
        if (players.length === 0) {
            io.to(socket.id).emit('join_status', false);  // Emit only to the specific socket
            return;
        }
    
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
        console.log("user disconnected", socket.id)
    })
});

app.use(cors())

app.get('/api/items', (req, res) => {
    res.send(items);
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});