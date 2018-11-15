var player;
var player2;
var gravity = 1;
var ground;
var playerIMG, earthIMG, hatIMG;
var bullets;

var socket;

function preload()
{
    playerIMG = loadImage("characters/DefaultPlayer/defaultPlayer.png");
    earthIMG = loadImage("earth.png");
    hatIMG = loadImage("characters/clothes/hat.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://dsscameras.ddns.net:8000');
  ground = createSprite(0, 2000, 5000, 40);
  // ground.addImage(earthIMG);
  // ground.setCollider("circle");
  //ground.scale = 4;
	//ground.immovable = true;
  ground.debug = true;
  player = new Player();
  player2 = new Player();
  //player.s.collide(player2.s);
  bullets = new Group();

  socket.on('position', newPlayer);
}

function newPlayer(data){
  var data2 = JSON.parse(data);
  player2.s.position.x = data2.x;
  player2.s.position.y = data2.y;
  player2.s.scale = data2.scale;
  player2.s.rotation = data2.rotation;
}

function draw() {

  background(220);

  camera.position.x = player.s.position.x;
  camera.position.y = player.s.position.y;
  camera.rotation = player.s.rotation;

  player.clones.overlap(bullets, Hit);
  player.updatePlayer();
  if(player.s.collide(player2.s))
    {
      player.s.debug = true;
      player.s.velocity.x = 0;
      player.s.velocity.y = 0;    
    }
  

  sendToServer();
  drawSprites();
  //camera.off();

}

function sendToServer(){
  var data = {
    x : player.s.position.x,
    y : player.s.position.y,
    scale : player.s.scale,
    rotation : player.s.rotation
  }
  var myJson = JSON.stringify(data);
  socket.emit('playerData', myJson);
}

function Hit(){

}
