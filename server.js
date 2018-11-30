
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
    this.scale;
    this.rotation;
}

io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log('new connection: ' + socket.id);

	socket.on('newPlayer', newPlayer);
	function newPlayer(data){
		var player = new Player(socket.id);
		player.x = data.x;
		player.y = data.y;
		player.scale = data.scale;
		player.rotation = data.rotation;
		players.push(player);
		socket.broadcast.emit('newPlayerServer', players);
	}

	socket.on('playerUpdate', playerData);
	function playerData(data){
		for(var i=0; i<players.length; i++){
			if(socket.id == players[i].playerID){
				players[i].x = data.x;
				players[i].y = data.y;
				players[i].scale = data.scale;
				players[i].rotation = data.rotation;
			}
		}
		socket.emit('updatePlayers', players);
	}

	socket.on('disconnect', function(){
		for(var i=0; i<players.length; i++)
			if(players[i].playerID == socket.id)
				players.splice(i, 1);
    console.log('user disconnected');

  });
}