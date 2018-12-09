var characterChosen = 1;

function CharacterSelection(){
	background('rgb(135,206,250)');
	
	if(keyWentDown('a')){
		player.remove();
		if(characterChosen > 1)
			characterChosen--;
		displayCharacters();
	}
	if(keyWentDown('d')){
		player.remove();
		if(characterChosen < 3)
			characterChosen++;
		displayCharacters();
	}

	function displayCharacters(){
		if(characterChosen == 1)
		player = new Player(windowWidth/2, windowHeight/2);
	else if(characterChosen == 2)
		player = new Luffy(windowWidth/2, windowHeight/2);
	else if(characterChosen == 3)
		player = new Goku(windowWidth/2, windowHeight/2);
	}

	if(keyWentDown(ENTER)){
		player.s.position.x = 50/*random(-1000, 1000)*/;
		player.s.position.y = 1500/*random(1500, 2000)*/;
		characterChosen = 0;
		name = input.value();
		input.remove();
	}
	if(mouseWentDown(LEFT)){
		player.s.position.x = 50/*random(-1000, 1000)*/;
		player.s.position.y = 1500/*random(1500, 2000)*/;
		characterChosen = 0;
		name = input.value();
		input.remove();
	}
	//player.updatePlayer();
	player.s.position.x = windowWidth/2;
	player.s.position.y = windowHeight/2;

	camera.off();

	textSize(30);
	textStyle(BOLD);
	textAlign(CENTER);
	text(" select A or D, choose ENTER", windowWidth/2, windowHeight/2 + 200);

	drawSprites();
}