var ssjHairIMG, sayanHairIMG;

function preloadGoku(){
  sayanHairIMG = loadImage("characters/hair/hair1.png");
  ssjHairIMG = loadImage("characters/Goku/assets/ssjHair.png");
}

function Goku(x, y){
  this.playerSprites = new Group();
	this.playerID;
  this.HP = 100;
  this.energy = 100;
  this.moveSpeed = 5;
  this.jumpForce = 12;
  this.clones = new Group();
  this.nrClones = 0;
  this.x = 100;
  this.y = 100;
  this.spriteWeight = 60;
  this.spriteHeight = 60;
  this.color = 100;
  this.s = createSprite(x, y);
  this.s.width = 100;
  this.s.addAnimation('standing',playerIMG);
  this.s.addAnimation('walking', player_walk_anim);
  this.hair = createSprite(this.s.position.x, this.s.position.y);
  this.hair.addImage(sayanHairIMG);

  this.remove = function(){
    this.playerSprites.add(this.s);
    this.playerSprites.add(this.hair);
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
      //player.s.attractionPoint(-12, ground.position.x, ground.position.y);
  }

  this.resize = function(multiplicator){
    this.s.scale *= multiplicator;
    this.s.height *= multiplicator;
    this.s.width *= multiplicator;
    camera.zoom /= multiplicator;
    this.moveSpeed *= multiplicator;
    this.hair.scale *= multiplicator;
    //this.jumpForce *= multiplicator;

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

        this.clones.get(i).velocity.y += gravity;
    }
  }

  this.updatePlayer = function(){
    if(this.s.collide(ground)){
      this.s.debug = true;
      this.s.velocity.x = 0;
      this.s.velocity.y = 0;    
    }

    this.s.changeAnimation('standing');

    this.s.velocity.x = 0;
    player.s.velocity.y += gravity;
    this.hair.position.x = this.s.position.x;
    this.hair.position.y = this.s.position.y;
    
    this.updateClones();
    Controls();

    this.s.debug = mouseIsPressed;

  }

}