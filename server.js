
var express = require('express');

var app = express();
var server = app.listen(8000);

app.use(express.static('public'));

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
	
	players.push(new Player(socket.id));

	//socket.broadcast.emit('newPlayer', playerID);

	socket.on('playerData', playerData);
	function playerData(data){
		socket.broadcast.emit('playersData', data);
		//console.log(" " + data);
	}

	socket.on('disconnect', function(){
    console.log('user disconnected');
  });
}