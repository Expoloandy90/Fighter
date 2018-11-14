function Controls(){
  //Player 1
    if(keyDown('d'))
      player.move(moveSpeed);
    if(keyDown('a'))
      player.move(-moveSpeed);
    if(keyWentDown('w'))
      player.jump();
    if(keyWentDown('r'))
      player.clone();
  
  if(keyDown('f'))
      background(255);
  
  //Player 2
    if(keyDown('k'))
      players[1].move(moveSpeed);
    if(keyDown('h'))
      players[1].move(-moveSpeed);
    if(keyWentDown('u'))
      players[1].jump();

    if(keyWentDown('z'))
      player.resize(1/1.1);
    if(keyWentDown('x'))
      player.resize(1.1);
}

