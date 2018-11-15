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

  if(keyWentDown('c'))
  {
    var bullet = createSprite(player.s.position.x, player.s.position.y, 50, 20);
    if(camera.mouseX < player.s.position.x - 10)
        bullet.velocity.x = -5 - player.s.getSpeed();
    else if(camera.mouseX > player.s.position.x + 10)
      bullet.velocity.x = 5 + player.s.getSpeed();
    else bullet.velocity.x = 0;

    if(camera.mouseY < player.s.position.y - 10)
        bullet.velocity.y = -5 - player.s.getSpeed();
    else if(camera.mouseY > player.s.position.y + 10)
      bullet.velocity.y = 5 + player.s.getSpeed();
    else bullet.velocity.y = 0;

    bullet.life = 50;
    bullets.add(bullet);
  }

  if(keyWentDown('z'))
      player.resize(1/2);
    if(keyWentDown('x'))
      player.resize(2);

  if(keyDown('f'))
      background(255);

  //Player 2
    if(keyDown('k'))
      players[1].move(moveSpeed);
    if(keyDown('h'))
      players[1].move(-moveSpeed);
    if(keyWentDown('u'))
      players[1].jump();

    
}

