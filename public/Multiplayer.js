var mPlayers = [];

function sendToServer(){
  var data = {
    character : player.character,
    x : player.s.position.x,
    y : player.s.position.y,
    scale : player.s.scale,
    rotation : player.s.rotation,
    sBodyAnimation: player.sBody.getAnimationLabel(),
    direction: player.s.mirrorX()    
  }
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
  socket.emit('newPlayer', data);
}

function newPlayer(data){
  if(mPlayers.length == 0)
    for(var i=0; i<data.length; i++){
      if(data[i].playerID != socket.id){
        var ceva = new Player(data[i].x, data[i].y);
      ceva.playerID = data[i].playerID;
      ceva.s.rotation = data[i].rotation;
      ceva.s.mirrorX(data[i].direction);
      mPlayers.push(ceva);
      }
    }
  else{
    for(var i=0; i<data.length; i++){
      var sem = true;
      for(var j=0; j<mPlayers.length; j++)
        if(mPlayers[j].playerID == data[i].playerID)
          sem = false;
      if(sem == true){
        var ceva = new Player();
        ceva.playerID = data[data.length - 1].playerID;
        ceva.s.position.x = data[data.length - 1].x;
        ceva.s.position.y = data[data.length - 1].y;
        ceva.s.rotation = data[data.length - 1].rotation;
        ceva.s.mirrorX(data[data.length - 1].direction);
        mPlayers.push(ceva);
      }  
    }
  }
}

function displayPlayers(data){
  if(mPlayers.length == 0)
    for(var i=0; i<data.length; i++){
      if(data[i].playerID != socket.id){
        var ceva = new Player(data[i].x, data[i].y);
      ceva.playerID = data[i].playerID;
      ceva.s.rotation = data[i].rotation;
      ceva.s.mirrorX(data[i].direction);
      mPlayers.push(ceva);
      }
    }
  for(var i=0; i< data.length; i++)
  {
    for(var j=0; j<mPlayers.length; j++){
      //console.log(data[i].playerID + mPlayers[j].playerID);
      if(mPlayers[j].playerID == data[i].playerID){
        mPlayers[j].s.position.x = data[i].x;
        mPlayers[j].s.position.y = data[i].y;
        mPlayers[j].s.scale = data[i].scale;
        mPlayers[j].s.rotation = data[i].rotation;
        mPlayers[j].sBody.changeAnimation(data[i].sBodyAnimation);
        mPlayers[j].s.mirrorX(data[i].direction);
        mPlayers[j].updatePlayer();
      }
    }
  }
}

function disconnectPlayer(id){
  for(var i=0; i<mPlayers.length; i++){
    if(mPlayers[i].playerID == id)
      mPlayers[i].remove();
      mPlayers.splice(i, 1);
  }
}