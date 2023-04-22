// const http = require('http');
// const express = require('express');
// const socketIO = require('socket.io');
// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const {Server} = require('socket.io')
const io = new Server(server ,{
  cors:{
    origin: 'https://sainath-socket.netlify.app',
    methods:['GET', "POST","PUT", "DELETE"],
  },
});

module.exports = {io,app,server,express}


