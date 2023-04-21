
const mongoose = require('mongoose');
const cors = require('cors');

const { io, app, server,express } = require('./utils/socket');
// const app = express();
// const server = http.createServer(app);



const userRoutes = require('./routes/users.route');



// Parse JSON request bodies
app.use(express.json());
app.use(cors())

//logging the request path & method
// app.use((req,res,next)=>{
//   console.log(req.path , req.method);
//   next()
// })



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


  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
// // Start the server
// const port = 8080;
// server.listen(port, () => console.log(`Server listening on port ${port}`));

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

//all the answers you gave were mugged up 
//& didm't give the answers properly
//so what would be the enhancements see the resume paper, & keep going with it