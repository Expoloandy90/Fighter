var blocks;

function generateTerrain(){

  blocks = new Group();
  var prevYpos = 20;
  for(var j=1; j<=20; j++)
  {
	  var yPos = random(prevYpos-1, prevYpos+1);
	  while(yPos >20)
		  yPos = random(prevYpos-1, prevYpos+1);
	  prevYpos = yPos;
	  for(var i=25; i>=yPos; i--){
		var block;
		block = createSprite(100*j-50, 100*i-50, 100, 100);
		block.shapeColor = random(1, 50);
		block.visible = false;
		blocks.add(block);
	  }
	  
  }
}

function updateTerrain(){
	for(var i=0; i<blocks.size(); i++){
		if(blocks.get(i).position.x < (player.s.position.x + windowWidth/2 + 50) && 
			blocks.get(i).position.x > (player.s.position.x - windowWidth/2 - 50) /*&& 
			blocks.get(i).position.y < (player.s.position.y + windowHeight/2 + 50)*/)
			
			blocks.get(i).visible = true;
		else blocks.get(i).visible = false;
	}
}