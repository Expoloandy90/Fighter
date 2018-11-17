var luffySuitIMG;

function preloadLuffy(){
  luffySuitIMG = loadImage("characters/Luffy/defaultLuffy.png");
}

function Luffy(x, y){
  this.playerSprites = new Group();
  this.playerID;
  this.HP = 100;
  this.moveSpeed = 5;
  this.jumpForce = 12;
  this.clones = new Group();
  this.nrClones = 0;
  this.s = createSprite(x, y);
  this.s.addAnimation('standing',playerIMG);
  this.s.addAnimation('walking', player_walk_anim);
  this.s.addAnimation('attack', player_attack_anim);
  this.suit = createSprite(this.s.position.x, this.s.position.y);
  this.suit.addImage(luffySuitIMG);

  this.remove = function(){
    this.playerSprites.add(this.s);
    this.playerSprites.add(this.suit);
    this.playerSprites.removeSprites();
  }

  this.move = function(dir){
    this.s.velocity.x += dir;
    if(this.s.velocity.x > 0){
      this.s.changeAnimation('walking');
      this.s.mirrorX(1);
    }
    else if(this.s.velocity.x < 0){
      this.s.changeAnimation('walking');
      this.s.mirrorX(-1);
    }
  }

  this.jump = function(){
      this.s.velocity.y = -this.jumpForce;
  }

  this.resize = function(multiplicator){
    if(this.s.height * multiplicator <= 2400 && this.s.height >= 75 * multiplicator){
      this.s.scale *= multiplicator;
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
        clone.collide(ground);
        clone.HP = 100;
        this.clones.add(clone);
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
        this.clones.get(i).debug = true;
        

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
    if(this.s.collide(ground))
    {
      this.s.velocity.x = 0;
      this.s.velocity.y = 0;    
    }

    this.s.changeAnimation('standing');
    
    this.s.debug = true;

    this.s.velocity.x = 0;
    player.s.velocity.y += gravity;
    this.suit.position.x = this.s.position.x;
    this.suit.position.y = this.s.position.y;
    
    this.updateClones();
    Controls();
  }

}
