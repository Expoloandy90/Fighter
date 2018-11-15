function Controls(){
  //Player 1
    if(keyDown('d'))
      player.move(moveSpeed);
    if(keyDown('a'))
      player.move(-moveSpeed);
    if(keyWentDown('w'))
      player.jump();
    if(keyWentDown('r'))
      player.cloning();

  if(keyWentDown('c'))
  {
    var bullet = createSprite(player.s.position.x, player.s.position.y, 50, 20);
    if(camera.mouseX < player.s.position.x)
        bullet.velocity.x = -5 - player.s.getSpeed();
    else bullet.velocity.x = 5 + player.s.getSpeed();

    bullet.life = 50;
    bullets.add(bullet);
  }

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

