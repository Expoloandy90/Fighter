var luffySuitIMG;
var luffySuitAnimation;

function preloadLuffy(){
  luffySuitIMG = loadImage("characters/Luffy/defaultLuffy.png");
  for(var i=1; i<=5; i++)
  luffySuitAnimation = loadAnimation("characters/Luffy/LuffyAnimation1.png", "characters/Luffy/LuffyAnimation2.png", "characters/Luffy/LuffyAnimation3.png", "characters/Luffy/LuffyAnimation4.png", "characters/Luffy/LuffyAnimation5.png");
}

function Luffy(x, y){
  this.playerSprites = new Group();
  this.playerID;
  this.HP = 100;
  this.power = 2;
  this.moveSpeed = 5;
  this.jumpForce = 12;
  this.clones = new Group();
  this.nrClones = 0;
  this.s = createSprite(x, y, 100, 300);
  this.s.visible = false
  this.sBody = createSprite(this.s.position.x, this.s.position.y);  
  this.sBody.addAnimation('standing',playerIMG);
  this.sBody.addAnimation('walking', player_walk_anim);
  this.sBody.addAnimation('attack', player_attack_anim);
  this.suit = createSprite(this.s.position.x, this.s.position.y);
  this.suit.addAnimation('standing', luffySuitIMG);
  this.suit.addAnimation('walking', luffySuitAnimation);

  this.remove = function(){
    this.playerSprites.add(this.s);
    this.playerSprites.add(this.suit);
    this.playerSprites.removeSprites();
  }

  this.move = function(dir){
    this.s.velocity.x += dir;
    if(this.s.velocity.x > 0){
      this.sBody.changeAnimation('walking');
      this.suit.changeAnimation('walking');
      this.sBody.mirrorX(1);
      this.suit.mirrorX(1);
    }
    else if(this.s.velocity.x < 0){
      this.sBody.changeAnimation('walking');
      this.suit.changeAnimation('walking');
      this.sBody.mirrorX(-1);
      this.suit.mirrorX(-1);
    }
  }

  this.jump = function(){
      this.s.velocity.y = -this.jumpForce;
  }

  this.resize = function(multiplicator){
    if(this.s.height * multiplicator <= 2400 && this.s.height >= 75 * multiplicator){
      this.sBody.scale *= multiplicator;
      this.s.height *= multiplicator;
      this.s.width *= multiplicator;
      camera.zoom /= multiplicator;
      this.moveSpeed *= multiplicator;
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

    if(this.s.getAnimationLabel() != 'attack'){
      this.s.changeAnimation('standing');
      this.suit.changeAnimation('standing');
    }
    if(this.s.getAnimationLabel() == 'attack' && this.s.animation.getFrame() == 5){
      this.s.overlap(player.clones, function(s,clone){
        var damage = 25 * player.power;
        clone.HP -= damage;
      });
      this.sBody.animation.nextFrame();
      this.sBody.animation.play();
    }

    this.s.velocity.x = 0;
    player.s.velocity.y += gravity;
    this.sBody.position.x = this.s.position.x;
    this.sBody.position.y = this.s.position.y;
    this.suit.position.x = this.s.position.x;
    this.suit.position.y = this.s.position.y;
    
    this.updateClones();
    Controls();
  }

}
