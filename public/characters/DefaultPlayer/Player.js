var playerIMG;
var player_walk_anim, axe_anim, player_attack_anim;

function preloadPlayer(){
  playerIMG = loadImage("characters/DefaultPlayer/defaultPlayer.png");
  player_walk_anim = loadAnimation("characters/DefaultPlayer/defaultPlayerAnimation1.png", "characters/DefaultPlayer/defaultPlayerAnimation2.png", "characters/DefaultPlayer/defaultPlayerAnimation3.png", "characters/DefaultPlayer/defaultPlayerAnimation4.png", "characters/DefaultPlayer/defaultPlayerAnimation5.png");
  axe_anim = loadAnimation("characters/guns/defaultStick1.png", "characters/guns/defaultStick2.png", "characters/guns/defaultStick3.png", "characters/guns/defaultStick4.png", "characters/guns/defaultStick5.png")
  player_attack_anim = loadAnimation("characters/DefaultPlayer/defaultPlayerAttack1.png", "characters/DefaultPlayer/defaultPlayerAttack2.png", "characters/DefaultPlayer/defaultPlayerAttack3.png", "characters/DefaultPlayer/defaultPlayerAttack4.png", "characters/DefaultPlayer/defaultPlayerAttack5.png", "characters/DefaultPlayer/defaultPlayerAttack6.png", "characters/DefaultPlayer/defaultPlayerAttack7.png", "characters/DefaultPlayer/defaultPlayerAttack8.png", "characters/DefaultPlayer/defaultPlayerAttack9.png", "characters/DefaultPlayer/defaultPlayerAttack10.png");
  player_attack_anim.looping = false;
}

function Player(x, y){
  this.playerSprites = new Group();
  this.playerID;
  this.HP = 100;
  this.power = 2;
  this.energy = 100;
  this.moveSpeed = 5;
  this.jumpForce = 20;
  this.clones = new Group();
  this.nrClones = 0;
  this.s = createSprite(x, y, 100, 300);
  this.s.visible = false
  this.sBody = createSprite(this.s.position.x, this.s.position.y);  
  this.sBody.addAnimation('standing',playerIMG);
  this.sBody.addAnimation('walking', player_walk_anim);
  this.sBody.addAnimation('attack', player_attack_anim);
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
      this.sBody.changeAnimation('walking');
      this.axe.changeAnimation('walking');
      this.sBody.mirrorX(1);
      this.axe.mirrorX(1);
    }
    else if(this.s.velocity.x < 0){
      this.sBody.changeAnimation('walking');
      this.axe.changeAnimation('walking');
      this.sBody.mirrorX(-1);
      this.axe.mirrorX(-1);
    }
  }

  this.jump = function(){
      this.s.velocity.y = -this.jumpForce;
  }

  this.resize = function(multiplicator){
    if(this.s.height * multiplicator <= 2400 && this.s.height >= 75 * multiplicator){
      if(multiplicator > 1)
      this.s.position.y -= 1000;
      this.sBody.scale *= multiplicator;
      this.s.height *= multiplicator;
      this.s.width *= multiplicator;
      camera.zoom /= multiplicator;
      this.moveSpeed *= multiplicator;
      this.hat.scale *= multiplicator;
      this.axe.scale *= multiplicator;
    }
    

  }

  this.cloning = function(){
    if(this.nrClones < 5)
    {
        var clone = createSprite(random(player.s.position.x-100, player.s.position.x+100), random(player.s.position.y-100, player.s.position.y));
        clone.addImage(playerIMG);
        clone.collide(blocks);
        clone.HP = 100;
        this.clones.add(clone);
        this.nrClones++;
    }
  }

  this.updateClones = function(){
    for(var i=0; i<this.clones.size(); i++)
    {
        if(this.clones.collide(blocks))
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

        if(this.clones.get(i).HP <= 0){
          this.clones.get(i).remove();
          this.nrClones--;
        }
    }
  }

  this.updatePlayer = function(){
    if(this.s.collide(blocks))
    {
      this.s.velocity.x = 0;
      this.s.velocity.y = 0;    
    }
    this.s.velocity.x = 0;

    this.sBody.position.x = this.s.position.x;
    this.sBody.position.y = this.s.position.y;

    this.hat.position.x = this.s.position.x;
    this.hat.position.y = this.s.position.y;
    this.axe.position.x = this.s.position.x;
    this.axe.position.y = this.s.position.y;
    

    

    //Changing punch animation
    if(this.sBody.getAnimationLabel() != 'attack'){
      this.sBody.changeAnimation('standing');
    }
    if(this.sBody.getAnimationLabel() == 'attack' && this.sBody.animation.getFrame() == 5){
      this.sBody.overlap(player.clones, function(s,clone){
        var damage = 25 * player.power;
        clone.HP -= damage;
      });
      this.sBody.animation.nextFrame();
      this.sBody.animation.play();
    }
    this.axe.changeAnimation('standing');

    
    
    player.s.velocity.y += gravity;
    this.updateClones();
    Controls();
  }

}
