var player;
var gravity = 1;
var moveSpeed = 5;
var ground;
var playerIMG;

function preload()
{
    playerIMG = loadImage('player/player.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ground = createSprite(0, height-100, width*2, 40);
	ground.immovable = true;
  //ground.mouseActive = true;
  player = new Player();
}

function draw() {

  background(220);
  
  camera.position.x = player.s.position.x;
  camera.position.y = player.s.position.y;
  
 
  camera.zoom = 2;


  
  updatePlayer();
  drawSprites();
  
  camera.off();

}

