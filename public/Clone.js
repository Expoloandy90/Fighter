function Clone(player){
  this.s = createSprite(random(player.position.x-100,player.position.x+100), random(player.position.y-100,player.position.y));
  this.s.addImage(loadImage('player/player.png'));
  ground.displace(this.s);
	
  
//   this.move = function(player){
//     this.s.position.x = player.position.x + 10;
//   }
  
//   this.jump = function(){
//     if(this.s.velocity.y == 0)
//    		this.s.velocity.y = -12; 
//   }
  
//   this.resize = function(multiplicator){
//     this.s.scale *= multiplicator;
//   	this.s.height *= multiplicator;
//     this.s.width *= multiplicator;
//   }
}