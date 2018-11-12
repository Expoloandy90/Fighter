
var express = require('express');

var app = express();
var server = app.listen(8000);

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log('new connection: ' + socket.id);
	var playerID = socket.id;
	socket.broadcast.emit('newPlayer', playerID);

	socket.on('position', positionMsg);

	function positionMsg(data){
		socket.broadcast.emit('position', data);
		console.log(data + socket.id);
	}
}