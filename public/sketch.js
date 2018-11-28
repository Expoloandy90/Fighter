var player;
var player2;
var gravity = 1;
var ground;
var earthIMG;

var socket;

function preload()
{
    preloadEnvironment();
    preloadPlayer();
    preloadGoku();
    preloadLuffy();
    preloadClothes();
    earthIMG = loadImage("earth.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://dsscameras.ddns.net:8000');
  //ground = createSprite(0, 2000, 5000, 40);
  generateTerrain();
  bullets = new Group();
  player = new Player(windowWidth/2, windowHeight/2);  
  //Environment();
  //startMP();
  socket.on('newPlayerServer', newPlayer);
  socket.on('updatePlayers', displayPlayers);
}



function draw() {
  if(player.s.position.y < 2000 &&  player.s.position.y > 1000)
    background('rgb(135,206,250)');
  else background('rgb(25,25,112)');

  if(characterChosen == 0){
    
    camera.position.x = player.s.position.x;
    camera.position.y = player.s.position.y;
    camera.rotation = player.s.rotation;

    player.clones.displace(bullets, Hit);
    player.updatePlayer();

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
  text("HP " + player.HP, 100, 100);
  fill('rgb(0, 0, 255)');
  if(player.energy != undefined)
  text("Energy " + player.energy, 100, 150);
}

// pop - Removes from the End of an Array
// shift - Removes from the beginning of an Array
// splice - removes from a specific Array index
// filter - allows you to programatically remove elements from an Array