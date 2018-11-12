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
  this.s.addImage(loadImage('player/player.png'));
  ground.displace(this.s);
	
  this.hit = function(){
    
  }
  
  this.move = function(dir){
    this.s.position.x += dir;
  }
  
  this.jump = function(){
    //if(this.s.velocity.y == 0)
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
  	 		if(ground.displace(this.clones[i].s))   
    		{
					this.clones[i].s.velocity.x = 0;
      		this.clones[i].s.velocity.y = 0;
    		}
    		else this.clones[i].s.velocity.y += gravity;
  	}
  }
}

function updatePlayer(){
  
  for(var i=0 ;i<players.length ; i++)
  {
    if(ground.displace(players[i].s))   
    {
			players[i].s.velocity.x = 0;
      players[i].s.velocity.y = 0;
    }
    else players[i].s.velocity.y += gravity;
    
    players[i].updateClones();
    
    Controls(i);

    players[i].s.debug = mouseIsPressed;
  }
  
  
}
