const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('message', 'init connect message from server');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/ping', (req, res) => {
    console.log('receiving ping');
    io.emit('message', 'touchdesigner ping');
    res.sendStatus(200);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
