var mPlayers = [];
var player;
var player2;
var gravity = 1;
var ground;
var playerIMG, earthIMG, hatIMG, ssjHairIMG;
var player_walk_anim;
var bullets;
var characterChosen = 0;

var socket;

function preload()
{
    playerIMG = loadImage("characters/DefaultPlayer/defaultPlayer.png");
    earthIMG = loadImage("earth.png");
    hatIMG = loadImage("characters/clothes/hat.png");
    ssjHairIMG = loadImage("characters/Goku/assets/ssjHair.png");
    player_walk_anim = loadAnimation("characters/DefaultPlayer/defaultPlayerAnimation1.png", "characters/DefaultPlayer/defaultPlayerAnimation2.png", "characters/DefaultPlayer/defaultPlayerAnimation3.png", "characters/DefaultPlayer/defaultPlayerAnimation4.png", "characters/DefaultPlayer/defaultPlayerAnimation5.png");
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

  player2 = new Player();
  //player.s.collide(player2.s);
  bullets = new Group();

  socket.on('position', newPlayer);
}



function draw() {

  background(220);

  if(keyWentDown('1') && characterChosen == 0){
    player = new Player();
    characterChosen = 1;
  }
  if(keyWentDown('2') && characterChosen == 0){
    characterChosen = 1;
    player = new Goku();
  }

  if(characterChosen != 0){
    
    camera.position.x = player.s.position.x;
    camera.position.y = player.s.position.y;
    camera.rotation = player.s.rotation;

    player.clones.overlap(bullets, Hit);
    player.updatePlayer();
    player2.updatePlayer();

    sendToServer();
    drawSprites();
  }

}

function Hit(){

}
