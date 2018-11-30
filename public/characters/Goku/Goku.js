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
  this.character = "Goku";
  this.playerSprites = new Group();
	this.playerID;
  this.HP = 100;
  this.power = 2;
  this.energy = 100;
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
  this.hair = createSprite(this.s.position.x, this.s.position.y);
  this.hair.addImage('sayanHair',sayanHairIMG);
  this.hair.addImage('ssjHair',ssjHairIMG);
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
      this.sBody.changeAnimation('walking');
      this.sBody.mirrorX(1);
    }
    else if(this.s.velocity.x < 0){
      this.sBody.changeAnimation('walking');
      this.sBody.mirrorX(-1);
    }
  }

  this.jump = function(){
      this.s.velocity.y = -this.jumpForce;
      //player.s.attractionPoint(-12, ground.position.x, ground.position.y);
  }

  this.resize = function(multiplicator){
    this.sBody.scale *= multiplicator;
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
    
    this.sBody.position.x = this.s.position.x;
    this.sBody.position.y = this.s.position.y;
    this.hair.position.x = this.s.position.x;
    this.hair.position.y = this.s.position.y;
    this.aura.position.x = this.s.position.x;
    this.aura.position.y = this.s.position.y;

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
    

    if(keyDown('E')){
      this.energy += 1;
      this.aura.visible = true;
     } else this.aura.visible = false;

     if(keyWentDown('S')){
      this.hair.changeImage('sayanHair');
      this.aura.changeAnimation('defaultAura');
     }
     if(keyWentDown('T')){
      if(this.energy >= 100){
        this.energy -= 100;
        this.power *= 2;
        this.hair.changeImage('ssjHair');
        this.aura.changeAnimation('ssjAura');
      }
     }

    player.s.velocity.y += gravity;    
    this.updateClones();
    Controls();
  }

}
