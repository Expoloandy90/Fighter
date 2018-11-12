var players = [];
var gravity = 1;
var moveSpeed = 5;
var ground;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ground = createSprite(0, height-100, width*2, 40);
	players[0] = new Player();
  players[1] = new Player();
}

function draw() {
  
  background(220);
  
  updatePlayer();
  drawSprites();
  
}

