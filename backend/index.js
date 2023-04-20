const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);
const {Server} = require('socket.io')
const io = new Server(server ,{
  cors:{
    origin: 'http://localhost:3000',
    methods:['GET', "POST","PUT", "DELETE"],
  },
});


const userRoutes = require('./routes/users.route');


// Parse JSON request bodies
app.use(express.json());
app.use(cors())



// Connect to the database
mongoose.connect('mongodb+srv://sainath47:16oct1996@saicluster2.kzyf6n0.mongodb.net/nyxWolf', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to the database'))
  .catch(error => console.error(error));


// Set up user routes
app.use('/users', userRoutes);




io.on('connection', (socket) => {
  console.log('New client connected');
socket.on("god", ()=>{
  console.log("god speaking");
})
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
// Start the server
const port = 8080;
server.listen(port, () => console.log(`Server listening on port ${port}`));



//all the answers you gave were mugged up 
//& didm't give the answers properly
//so what would be the enhancements see the resume paper, & keep going with it