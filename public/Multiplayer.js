var mPlayers = [];

function sendToServer(){
  var data = {
    playerID : socket.id,
    character : player.character,
    x : player.s.position.x,
    y : player.s.position.y,
    scale : player.s.scale,
    rotation : player.s.rotation
  }
  //var myJson = JSON.stringify(data);
  socket.emit('playerUpdate', data);
}

function startMP(){
  var data = {
    playerID : socket.id,
    character : player.character,
    x : player.s.position.x,
    y : player.s.position.y,
    scale : player.s.scale,
    rotation : player.s.rotation
  }
  //var myJson = JSON.stringify(data);
  socket.emit('newPlayer', data);
}

function newPlayer(data){
  if(mPlayers.length == 0)
  for(var i=0; i<data.length; i++){
    var ceva = new Player(data[i].x, data[i].y);
    ceva.playerID = data[i].playerID;
    ceva.s.rotation = data[i].rotation;
    ceva.s.mirrorX = data[i].direction;
    mPlayers.push(ceva);
  }
  else{
    for(var i=0; i<data.length; i++)
      for(var j=0; j<mPlayers.length; j++){
        if(data[i].playerID != mPlayers[j].playerID)
          var ceva = new Player();
          ceva.playerID = data[i].playerID;
          ceva.s.position.x = data[i].x;
          ceva.s.position.y = data[i].y;
          ceva.s.rotation = data[i].rotation;
          ceva.s.mirrorX = data[i].direction;
          mPlayers.push(ceva);
      }
  }
  console.log(data);
}

function displayPlayers(data){
  for(var i=0; i< data.length; i++)
  {
    for(var j=0; j<mPlayers.length; j++){
      //console.log(data[i].playerID + mPlayers[j].playerID);
      if(mPlayers[j].playerID == data[i].playerID){
        mPlayers[j].s.position.x = data[i].x;
        mPlayers[j].s.position.y = data[i].y;
        mPlayers[j].s.scale = data[i].scale;
        mPlayers[j].s.rotation = data[i].rotation;
        mPlayers[j].s.mirrorX = data[i].direction;
        //mPlayers[j].updatePlayer();
      }
    }
  }
}