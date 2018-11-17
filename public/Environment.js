var treeIMG, flowersIMG, grassIMG, grassFieldIMG, rock1IMG, rock2IMG, rock3IMG, deadBushIMG, bushIMG, bushBerriesIMG, bushFruitsIMG, bushFlowersIMG, grass3IMG, sugarcaneIMG, papuraIMG;

var treesGroup;

function preloadEnvironment(){
	treeIMG = loadImage("assets/copac.png");
	flowersIMG = loadImage("assets/flori.png");
	grassIMG = loadImage("assets/iarba1.png");
	grassFieldIMG = loadImage("assets/iarbaMica2.png");
	grass3IMG = loadImage("assets/iarbaMica3.png");
	rock1IMG = loadImage("assets/Rock1.png");
	rock2IMG = loadImage("assets/Rock2.png");
	rock3IMG = loadImage("assets/RockMini.png");
	deadBushIMG = loadImage("assets/TufaMoarta.png");
	bushIMG = loadImage("assets/Tufa2.png");
	bushFlowersIMG = loadImage("assets/TufaCuFlori.png");
	bushBerriesIMG = loadImage("assets/TufaCUPOjar2.png");
	bushFruitsIMG = loadImage("assets/TufaCUPOjar.png");
	sugarcaneIMG = loadImage("assets/sugarcane.png");
	papuraIMG = loadImage("assets/papura.png");
}


function Environment(){
	
	life = new Group();

	for(var i=0; i<6; i++)
  	{
    	var bush = createSprite(random(-2500, 2500), ground.position.y - 170);
    	bush.addImage(bushIMG);
   	 	life.add(bush);
  	}

	for(var i=0; i<3; i++)
  	{
    	var tree = createSprite(random(-2500, 2500), ground.position.y - 370);
    	tree.addImage(treeIMG);
   	 	life.add(tree);
  	}

  	for(var i=0; i<15; i++)
  	{
    	var grass = createSprite(random(-2500, 2500), ground.position.y - 170);
    	grass.addImage(grassIMG);
   	 	life.add(grass);
  	}

  	for(var i=0; i<8; i++)
  	{
    	var flower = createSprite(random(-2500, 2500), ground.position.y - 170);
    	flower.addImage(flowersIMG);
   	 	life.add(flower);
  	}

  	for(var i=0; i<10; i++)
  	{
    	var rock = createSprite(random(-2500, 2500), ground.position.y - 170);
    	rock.addImage(rock1IMG);
   	 	life.add(rock);
  	}

  	for(var i=0; i<10; i++)
  	{
    	var rock = createSprite(random(-2500, 2500), ground.position.y - 170);
    	rock.addImage(rock2IMG);
   	 	life.add(rock);
  	}

  	for(var i=0; i<10; i++)
  	{
    	var rock = createSprite(random(-2500, 2500), ground.position.y - 170);
    	rock.addImage(rock3IMG);
   	 	life.add(rock);
  	}
}