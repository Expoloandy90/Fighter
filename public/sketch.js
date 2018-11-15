var player;
var player2;
var gravity = 1;
var ground;
var playerIMG;
var bullets;

var socket;

function preload()
{
    playerIMG = loadImage("characters/DefaultPlayer/defaultPlayer.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://dsscameras.ddns.net:8000');
  ground = createSprite(2500, 1000, 5000, 40);
	ground.immovable = true;
  //ground.mouseActive = true;
  player = new Player();
  player2 = new Player();

  bullets = new Group();

  socket.on('position', newPlayer);
}

function newPlayer(data){
  var data2 = JSON.parse(data);
  player2.s.position.x = data2.x;
  player2.s.position.y = data2.y;
}

function draw() {

  background(220);

  camera.position.x = player.s.position.x;
  camera.position.y = player.s.position.y;

    player.clones.overlap(bullets, Hit);

  player.updatePlayer();
  sendToServer();
  drawSprites();
  //camera.off();

}

function sendToServer(){
  var data = {
    x : player.s.position.x,
    y : player.s.position.y,
  }
  var myJson = JSON.stringify(data);
  socket.emit('playerData', myJson);
}

function Hit(){

}
