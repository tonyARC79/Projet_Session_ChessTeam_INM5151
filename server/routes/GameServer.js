const express = require('express');
const app = express();
const cors = require('cors')
const errorHandler = require('./utils/ErrorHandler')
const session = require('./routes/Session.js')
const userRoutes = require('./routes/User.js');
const http = require('http')
const socket = require('socket.io');

const port = process.env.PORT || 4000;
app.use(cors())

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }));

app.use('/', session)
app.use('/api', userRoutes)
app.use(errorHandler)

const server = http.Server(app)
const io = socket(server);
//var joined = true;

// keep track of how many players in a game (0, 1, 2)
var players = 0;
 
// create an array of 100 games and initialize them
var games = Array(1);
for (let i = 0; i < 1; i++) {
    games[i] = {players: 0 , pid: [0 , 0]};
    console.log('Game #' + games[i])
}



io.on('connection', function (socket) {

  var playerId = Math.floor((Math.random() * 10) + 1);
  //console.log('Player # ' + playerId + ' is connected');


  socket.on('joined', function (roomId) {
    // games[roomId] = {}
    if (games[roomId].players < 2) {
      games[roomId].players++;
      games[roomId].pid[games[roomId].players - 1] = playerId;
      console.log(playerId)
    }
    else {
      socket.emit('full', roomId)
      return;
    }

    //console.log(games[roomId]);
    players = games[roomId].players


    if (players % 2 == 0) color = 'black';
    else color = 'white';

    socket.emit('player', { playerId, players, color, roomId })
    console.log({ playerId, players, color, roomId })
    players++;

    console.log(players)


  });

  socket.on('move', function (msg) {
    socket.broadcast.emit('move', msg);
    console.log(msg);
  });
  

  socket.on('play', function (msg) {
    socket.broadcast.emit('play', msg);
    console.log("ready " + msg);
  });

  socket.on('disconnection', function () {
    // for (let i = 0; i < 100; i++) {
    //   if (games[i].pid[0] == playerId || games[i].pid[1] == playerId)
    //     games[i].players--;
    // }
    console.log(playerId + ' disconnected');

  });
})

server.listen(port, () => {
  console.log(`App listening at ${port}`)
});






