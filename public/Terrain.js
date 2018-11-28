var blocks;

function generateTerrain(){

  blocks = new Group();
  var prevYpos = 20;
  for(var j=1; j<=100; j++)
  {
	  var yPos = random(prevYpos-1, prevYpos+1);
	  while(yPos >20)
		  yPos = random(prevYpos-1, prevYpos+1);
	  prevYpos = yPos;
	  for(var i=20; i>=yPos; i--){
		var block;
		block = createSprite(100*j-50, 100*i-50, 100, 100);
		block.shapeColor = random(1, 50);
		blocks.add(block);
	  }
	  
  }
}