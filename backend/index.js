const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);


const userRoutes = require('./routes/users.route');




io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Connect to the database
mongoose.connect('mongodb+srv://sainath47:16oct1996@saicluster2.kzyf6n0.mongodb.net/nyxWolf', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to the database'))
  .catch(error => console.error(error));

// Parse JSON request bodies
app.use(express.json());
app.use(cors())
// Set up user routes
app.use('/users', userRoutes);

// Start the server
const port = 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));
