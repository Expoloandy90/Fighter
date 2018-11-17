function Player(x, y){
  this.playerSprites = new Group();
  this.playerID;
  this.HP = 100;
  this.moveSpeed = 5;
  this.jumpForce = 12;
  this.clones = new Group();
  this.nrClones = 0;
  this.x = 100;
  this.y = 100;
  this.s = createSprite(x, y);
  this.s.addAnimation('standing',playerIMG);
  this.s.addAnimation('walking', player_walk_anim);
  this.s.addAnimation('attack', player_attack_anim);
  this.hat = createSprite(this.s.position.x, this.s.position.y);
  this.hat.addImage(hatIMG);
  this.axe = createSprite(this.s.position.x, this.s.position.y);
  this.axe.addAnimation('walking', axe_anim);
  this.axe.addAnimation('standing', loadImage("characters/guns/defaultStick.png"));

  this.remove = function(){
    this.playerSprites.add(this.s);
    this.playerSprites.add(this.hat);
    this.playerSprites.add(this.axe);
    this.playerSprites.removeSprites();
  }

  this.move = function(dir){
    this.s.velocity.x += dir;
    if(this.s.velocity.x > 0){
      this.s.changeAnimation('walking');
      this.axe.changeAnimation('walking');
      this.s.mirrorX(1);
      this.axe.mirrorX(1);
    }
    else if(this.s.velocity.x < 0){
      this.s.changeAnimation('walking');
      this.axe.changeAnimation('walking');
      this.s.mirrorX(-1);
      this.axe.mirrorX(-1);
    }
  }

  this.jump = function(){
      this.s.velocity.y = -this.jumpForce;
  }

  this.resize = function(multiplicator){
    this.s.scale *= multiplicator;
    this.s.height *= multiplicator;
    this.s.width *= multiplicator;
    camera.zoom /= multiplicator;
    this.moveSpeed *= multiplicator;
    this.hat.scale *= multiplicator;

  }

  this.cloning = function(){
    if(this.nrClones < 5)
    {
        this.clone = createSprite(random(player.s.position.x-100, player.s.position.x+100), random(player.s.position.y-100, player.s.position.y));
        this.clone.addImage(playerIMG);
        this.clone.collide(ground);
        this.clone.HP = 100;
        this.clones.add(this.clone);
        this.nrClones++;
    }
  }

  this.updateClones = function(){
    for(var i=0; i<this.clones.size(); i++)
    {
        if(this.clones.collide(ground))
        {
            this.clones.get(i).velocity.x = 0;
            this.clones.get(i).velocity.y = 0;
        }
        this.clones.get(i).scale = this.s.scale;
        this.clones.get(i).width = this.s.width;
        this.clones.get(i).height = this.s.height;
        this.clones.get(i).velocity.y += gravity;
        

        fill('rgb(0,255,0)');
        textSize(30);
        textStyle(BOLD);
        textAlign(CENTER);
        text(this.clones.get(i).HP, this.clones.get(i).position.x, this.clones.get(i).position.y - 150);

        if(this.clones.get(i).HP <= 0)
          this.clones.get(i).remove();
    }
  }

  this.updatePlayer = function(){
    if(this.s.collide(ground))
    {
      this.s.velocity.x = 0;
      this.s.velocity.y = 0;    
    }

    this.s.changeAnimation('standing');
    this.axe.changeAnimation('standing');

    this.s.velocity.x = 0;
    player.s.velocity.y += gravity;
    this.hat.position.x = this.s.position.x;
    this.hat.position.y = this.s.position.y;
    this.hat.scale = this.s.scale;

    this.axe.position.x = this.s.position.x;
    this.axe.position.y = this.s.position.y;
    this.axe.scale = this.s.scale;
    
    this.updateClones();
    Controls();
  }

}
