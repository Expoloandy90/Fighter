var blocks; 

function setup() {
  createCanvas(2000, 900);
  background(100);
  blocks = new Group();
  var prevYpos = 6;
  for(var j=1; j<=15; j++)
  {
	  var yPos = random(prevYpos-1, prevYpos+1);
	  while(yPos >9)
		  yPos = random(prevYpos-1, prevYpos+1);
	  prevYpos = yPos;
	  for(var i=9; i>=yPos; i--){
		var block;
		block = createSprite(100*j-50, 100*i-50, 100, 100);
		block.shapeColor = random(1, 50);
		blocks.add(block);
	  }
	  
  }
}

function draw() {
  if(mouseWentDown(LEFT))
	  createSprite(mouseX, mouseY, 100, 100);
  drawSprites();
}