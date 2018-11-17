var ssjHairIMG, sayanHairIMG, defaultAuraIMG;
var defaultAuraAnim, ssjAuraAnim;

function preloadGoku(){
  sayanHairIMG = loadImage("characters/hair/hair1.png");
  ssjHairIMG = loadImage("characters/Goku/assets/ssjHair.png");
  defaultAuraIMG = loadImage("characters/aura/defaultAura.png")
  defaultAuraAnim = loadAnimation("characters/aura/defaultAura3.png", "characters/aura/defaultAura2.png", "characters/aura/defaultAura1.png", "characters/aura/defaultAura.png");
  ssjAuraAnim = loadAnimation("characters/aura/ssjAura1.png", "characters/aura/ssjAura2.png","characters/aura/ssjAura3.png", "characters/aura/ssjAura4.png");
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
  this.color = 100;
  this.s = createSprite(x, y);
  this.s.addAnimation('standing',playerIMG);
  this.s.addAnimation('walking', player_walk_anim);
  this.s.addAnimation('attack', player_attack_anim);
  this.hair = createSprite(this.s.position.x, this.s.position.y);
  this.hair.addImage(sayanHairIMG);
  this.aura = createSprite(this.s.position.x, this.s.position.y);
  this.aura.addAnimation('defaultAura', defaultAuraAnim);
  this.aura.addAnimation('ssjAura', ssjAuraAnim);
  this.aura.visible = false;

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
    this.s.velocity.x = 0;
    this.s.changeAnimation('standing');
    this.hair.position.x = this.s.position.x;
    this.hair.position.y = this.s.position.y;
    this.aura.position.x = this.s.position.x;
    this.aura.position.y = this.s.position.y;
    this.s.debug = true;
    
    if(keyDown('E')){
      this.energy += 1;
      // image(defaultAuraIMG, this.s.position.x - 150, this.s.position.y - 250);
      // image(defaultAuraIMG, this.s.position.x - 150, this.s.position.y - 200);
      this.aura.visible = true;
     } else this.aura.visible = false;

     if(keyWentDown('S')){
      this.hair.addImage(sayanHairIMG);
      this.aura.changeAnimation('defaultAura');
     }else if(keyWentDown('T')){
      if(this.energy >= 100){
        this.energy -= 100;
        this.hair.addImage(ssjHairIMG);
        this.aura.changeAnimation('ssjAura');
      }
     }

    player.s.velocity.y += gravity;    
    this.updateClones();
    Controls();
  }

}
