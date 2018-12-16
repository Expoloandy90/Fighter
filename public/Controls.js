

function Controls(){
  //Player 1
  if(keyDown('d')){
    player.move(player.moveSpeed);
    player.movingAnimation(1);
  }

  if(keyDown('a')){
    player.move(-player.moveSpeed);
    player.movingAnimation(1);
  }

  if(!keyDown('d') && !keyDown('a') && moving == 0){
    player.movingAnimation(0);
  }

  if(keyWentDown('w'))
    player.jump();

  if(keyWentDown('r'))
    player.cloning();
    

  if(mouseWentDown(LEFT))
    Beam();

  //Attack melee
  if(keyWentDown(32)){
    player.sBody.changeAnimation('attack');
    player.sBody.animation.rewind();
  }
  
  if(keyWentDown('z'))
      player.resize(1/2);
    if(keyWentDown('x'))
      player.resize(2);

  if(keyDown('f'))
      background(255);    
}

