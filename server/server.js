const express = require('express');
const http = require('http');  // Import http module
const path = require('path');
const socketIo = require('socket.io');
const cors = require('cors');
const { disconnect } = require('process');

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

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    io.emit('alert', `${socket.id} has joined the chat`)

    socket.on('join', (data)=>{
        socket.join(data)
        console.log(`${socket.id} joined room: ${data}`)
    })

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