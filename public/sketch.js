var mPlayers = [];
var player;
var player2;
var gravity = 1;
var ground;
var playerIMG, earthIMG, hatIMG, ssjHairIMG;
var player_walk_anim;
var bullets;
var characterChosen = 0;
var flower_sprite_sheet, flowers;

var socket;

function preload()
{
    playerIMG = loadImage("characters/DefaultPlayer/defaultPlayer.png");
    earthIMG = loadImage("earth.png");
    hatIMG = loadImage("characters/clothes/hat.png");
    ssjHairIMG = loadImage("characters/Goku/assets/ssjHair.png");
    player_walk_anim = loadAnimation("characters/DefaultPlayer/stickman.png", "characters/DefaultPlayer/stickman2.png", "characters/DefaultPlayer/stickman3.png", "characters/DefaultPlayer/stickman4.png", "characters/DefaultPlayer/stickman5.png", "characters/DefaultPlayer/stickman6.png");
    var flower_frame = loadJSON('assets/flowersSprites.json');
    flower_sprite_sheet = loadSpriteSheet('assets/flower.png', flower_frame);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://dsscameras.ddns.net:8000');
  ground = createSprite(0, 2000, 5000, 40);
  ground.debug = true;

  player2 = new Player();
  bullets = new Group();

  flowers = new Group();
  for(var i=0; i<10; i++)
  {
    //create a sprite and add the 3 animations
    var flower = createSprite(random(-2500, 2500), 2000);
    //cycles through rocks 0 1 2
    var flowerAnimation = loadAnimation(flower_sprite_sheet);
    flower.addAnimation('normal', flowerAnimation);
    flowers.add(flower);
  }

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
