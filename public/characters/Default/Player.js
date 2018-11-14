function Player(){
  this.HP = 100;
  this.clones = [];
  this.nrClones = 0;
  this.x = 100;
  this.y = 100;
  this.spriteWeight = 60;
  this.spriteHeight = 60;
  this.color = 100;
  this.s = createSprite(random(0,550), random(0, 300), this.spriteWeight, this.spriteHeight);
  this.s.addImage(playerIMG);
  
  this.hit = function(){
    
  }
  
  this.move = function(dir){
    this.s.position.x += dir;
  }
  
  this.jump = function(){
      this.s.velocity.y = -12;
  }
  
  this.resize = function(multiplicator){
    this.s.scale *= multiplicator;
    this.s.height *= multiplicator;
    this.s.width *= multiplicator;
  }
  
  this.clone = function(){
    if(this.nrClones < 5)
    {
      this.clones[this.nrClones++]=new Clone(this.s);
      //this.clones[this.nrClones++]=new Clone(this.s.position.x, this.s.position.y);
      console.log("hi");
    }
    
  }
  
  this.updateClones = function(){
    for(var i=0 ;i<this.clones.length; i++)
    {
        if(this.clones[i].s.collide(ground))   
        {
          this.clones[i].s.velocity.x = 0;
          this.clones[i].s.velocity.y = 0;
        }
        
        this.clones[i].s.velocity.y += gravity;
    }
  }
}

function updatePlayer(){
    if(player.s.collide(ground))   
    {
      player.s.velocity.x = 0;
      player.s.velocity.y = 0;
    }
    
    player.s.velocity.y += gravity;
    
    player.updateClones();
    
    Controls();

    player.s.debug = mouseIsPressed; 
  
}
