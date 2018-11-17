var mPlayers = [];
var player;
var player2;
var gravity = 1;
var ground;
var playerIMG, earthIMG;
var player_walk_anim, axe_anim, player_attack_anim;
var flower_sprite_sheet, flowers;

var socket;

function preload()
{
    preloadGoku();
    preloadClothes();
    playerIMG = loadImage("characters/DefaultPlayer/defaultPlayer.png");
    earthIMG = loadImage("earth.png");
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
  bullets = new Group();
  player = new Player(windowWidth/2, windowHeight/2);
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

  //startMP();
  socket.on('newPlayerServer', newPlayer);
  socket.on('updatePlayers', displayPlayers);
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

    player.clones.displace(bullets, Hit);
    player.updatePlayer();
    //player2.updatePlayer();

    
    sendToServer();
    drawSprites();
    camera.off();
    UI();
  }
  else CharacterSelection();

}

function Hit(clone, bullet){
  bullet.remove();
  clone.HP -= 50;
}

function UI(){

  fill('rgb(0,255,0)');
  textSize(30);
  textStyle(BOLD);
  textAlign(CENTER);
  //text(player.HP, player.s.position.x, player.s.position.y - 150);
  text("HP " + player.HP, 100, 100);
  fill('rgb(0, 0, 255)');
  text("Energy " + player.energy, 100, 150);
}

// pop - Removes from the End of an Array
// shift - Removes from the beginning of an Array
// splice - removes from a specific Array index
// filter - allows you to programatically remove elements from an Array