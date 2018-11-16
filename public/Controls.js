function Controls(){
  //Player 1
    if(keyDown('d'))
      player.move(player.moveSpeed);
    if(keyDown('a'))
      player.move(-player.moveSpeed);
    if(keyWentDown('w'))
      player.jump();
    if(keyWentDown('r'))
      player.cloning();

  if(mouseWentDown(LEFT))
    Beam();
  if(keyIsDown(32))
player.s.changeAnimation('attack');
  
  if(keyWentDown('z'))
      player.resize(1/2);
    if(keyWentDown('x'))
      player.resize(2);

  if(keyDown('f'))
      background(255);    
}

