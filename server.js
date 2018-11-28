
var express = require('express');

var app = express();
var server = app.listen(8000);

app.use(express.static('test'));

console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

//Array of players
var players = [];
function Player(id){
	this.playerID = id;
    this.x; 
    this.y; 
    this.width;
    this.height;
    this.scale;
    this.rotation;
    this.direction;
}

io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log('new connection: ' + socket.id);

	// socket.on('newPlayer', newPlayer);
	// function newPlayer(data){
	// 	players.push(new Player(socket.id));
	// 	// data.playerID = socket.id;
	// 	// socket.broadcast.emit('newPlayerServer', data);
	// }

	// socket.on('playerUpdate', playerData);
	// function playerData(data){
	// 	socket.broadcast.emit('updatePlayers', data);
	// }

	socket.on('disconnect', function(){
    console.log('user disconnected');
  });
}