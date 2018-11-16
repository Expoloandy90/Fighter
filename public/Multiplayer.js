var mPlayers = [];

function sendToServer(){
  var data = {
    playerID : socket.id,
    x : player.s.position.x,
    y : player.s.position.y,
    width : player.s.width,
    height : player.s.height,
    scale : player.s.scale,
    rotation : player.s.rotation,
    direction : player.s.mirrorX()
  }
  //var myJson = JSON.stringify(data);
  socket.emit('playerData', data);
}
function displayPlayers(data){

  mPlayers.push(new Player(data.playerID));

  for(var i=0; i<= mPlayers.length; i++)
  {
      if(data.playerID != socket.id)
      {
        mPlayers[i].s.position.x = data.x;
        mPlayers[i].s.position.y = data.y;
        mPlayers[i].s.width = data.width;
        mPlayers[i].s.height = data.height;
        mPlayers[i].s.scale = data.scale;
        mPlayers[i].s.rotation = data.rotation;
        mPlayers[i].s.mirrorX(data.direction);
      }
      mPlayers[i].updatePlayer();
  }
}