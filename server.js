
const express = require('express');
const path = require('path');
const app = express();
const http = require('http');

require('dotenv').config();

const server = http.createServer(app);
const socketIo = require('./sockets');
const io = require('socket.io').listen(server);

const db = require('./db');
db.connect();

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
};

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

server.listen(PORT, () => {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
    socketIo(io);
});