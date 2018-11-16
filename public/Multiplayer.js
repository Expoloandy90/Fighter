function sendToServer(){
  var data = {
    playerID : socket.id,
    x : player.s.position.x,
    y : player.s.position.y,
    scale : player.s.scale,
    rotation : player.s.rotation
  }
  var myJson = JSON.stringify(data);
  socket.emit('playerData', myJson);
}

function newPlayer(data){
  var data2 = JSON.parse(data);
  player2.s.position.x = data2.x;
  player2.s.position.y = data2.y;
  player2.s.scale = data2.scale;
  player2.s.rotation = data2.rotation;
}