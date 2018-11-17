var mPlayers = [];

function sendToServer(){
  var data = {
    playerID : socket.id,
    x : player.s.position.x,
    y : player.s.position.y,
    width : player.s.width,
    height : player.s.height,
    scale : player.s.scale,
    rotation : player.s.rotation
  }
  //var myJson = JSON.stringify(data);
  socket.emit('playerUpdate', data);
}

function startMP(){
  console.log(player.playerID);
  var data = {
    playerID : socket.id,
    x : player.s.position.x,
    y : player.s.position.y,
    width : player.s.width,
    height : player.s.height,
    scale : player.s.scale,
    rotation : player.s.rotation
  }
  //var myJson = JSON.stringify(data);
  socket.emit('newPlayer', data);
}

function newPlayer(data){
  mPlayers.push(new Player(data.playerID));
}

function displayPlayers(data){
  if(data.playerID != undefined)
  for(var i=0; i<= mPlayers.length; i++)
  {
      if(mPlayers[i].playerID == data.playerID)
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