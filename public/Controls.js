function Controls(i){
  //Player 1
  	if(keyDown('d'))
      players[0].move(moveSpeed);
    if(keyDown('a'))
      players[0].move(-moveSpeed);
    if(keyWentDown('w'))
      players[0].jump();
  	if(keyWentDown('r'))
      players[i].clone();
  
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
      players[0].resize(1/1.1);
    if(keyWentDown('x'))
      players[0].resize(1.1);
}