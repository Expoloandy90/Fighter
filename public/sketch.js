var mPlayers = [];
var player;
var player2;
var gravity = 1;
var ground;
var playerIMG, earthIMG, hatIMG, ssjHairIMG;
var player_walk_anim, axe_anim, player_attack_anim;

var characterChosen = 0;
var flower_sprite_sheet, flowers;

var socket;

function preload()
{
    playerIMG = loadImage("characters/DefaultPlayer/defaultPlayer.png");
    earthIMG = loadImage("earth.png");
    hatIMG = loadImage("characters/clothes/hat.png");
    ssjHairIMG = loadImage("characters/Goku/assets/ssjHair.png");
    player_walk_anim = loadAnimation("characters/DefaultPlayer/defaultPlayerAnimation1.png", "characters/DefaultPlayer/defaultPlayerAnimation2.png", "characters/DefaultPlayer/defaultPlayerAnimation3.png", "characters/DefaultPlayer/defaultPlayerAnimation4.png", "characters/DefaultPlayer/defaultPlayerAnimation5.png");
    axe_anim = loadAnimation("characters/guns/defaultStick1.png", "characters/guns/defaultStick2.png", "characters/guns/defaultStick3.png", "characters/guns/defaultStick4.png", "characters/guns/defaultStick5.png")
    player_attack_anim = loadAnimation("characters/DefaultPlayer/defaultPlayerAttack1.png", "characters/DefaultPlayer/defaultPlayerAttack2.png", "characters/DefaultPlayer/defaultPlayerAttack3.png", "characters/DefaultPlayer/defaultPlayerAttack4.png", "characters/DefaultPlayer/defaultPlayerAttack5.png", "characters/DefaultPlayer/defaultPlayerAttack6.png", "characters/DefaultPlayer/defaultPlayerAttack7.png", "characters/DefaultPlayer/defaultPlayerAttack8.png", "characters/DefaultPlayer/defaultPlayerAttack9.png", "characters/DefaultPlayer/defaultPlayerAttack10.png");
    // var flower_frame = loadJSON('assets/flowersSprites.json');
    // flower_sprite_sheet = loadSpriteSheet('assets/flower.png', flower_frame);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://dsscameras.ddns.net:8000');
  ground = createSprite(0, 2000, 5000, 40);
  player = new Player(socket.id, 2);
  //player2 = new Player();
  bullets = new Group();

  // flowers = new Group();
  // for(var i=0; i<10; i++)
  // {
  //   //create a sprite and add the 3 animations
  //   var flower = createSprite(random(-2500, 2500), 2000);
  //   //cycles through rocks 0 1 2
  //   var flowerAnimation = loadAnimation(flower_sprite_sheet);
  //   flower.addAnimation('normal', flowerAnimation);
  //   flowers.add(flower);
  // }
  socket.on('playersData', displayPlayers);
}



function draw() {

  background(220);

  // if(keyWentDown('1') && characterChosen == 0){
  //   player = new Player();
  //   characterChosen = 1;
  // }
  // if(keyWentDown('2') && characterChosen == 0){
  //   characterChosen = 1;
  //   player = new Goku();
  // }

  if(characterChosen == 0){
    
    camera.position.x = player.s.position.x;
    camera.position.y = player.s.position.y;
    camera.rotation = player.s.rotation;

    player.clones.overlap(bullets, Hit);
    player.updatePlayer();
    //player2.updatePlayer();

    
    sendToServer();
    drawSprites();
    camera.off();
    UI();
  }

}

function Hit(clone, bullet){
  clone.HP -= 50;
  bullet.remove();
}

function UI(){

  fill('rgb(0,255,0)');
  textSize(30);
  textStyle(BOLD);
  textAlign(CENTER);
  //text(player.HP, player.s.position.x, player.s.position.y - 150);
  text("HP " + player.HP, 100, 100);

}