var characterChosen = 1;

function CharacterSelection(){
	if(keyWentDown(LEFT_ARROW)){
		player.remove();
		player = new Player(windowWidth/2, windowHeight/2);
	}
	if(keyWentDown(RIGHT_ARROW)){
		player.remove();
		player = new Goku(windowWidth/2, windowHeight/2);
	}
	if(keyWentDown(ENTER)){
		player.s.position.x = random(-1000, 1000);
		player.s.position.y = random(1500, 2000);
		characterChosen = 0;
	}
	//player.updatePlayer();
	player.s.position.x = windowWidth/2;
	player.s.position.y = windowHeight/2;

	camera.off();

	textSize(30);
	textStyle(BOLD);
	textAlign(CENTER);
	text(" select LEFT_ARROW or RIGHT_ARROW, choose ENTER", windowWidth/2, windowHeight/2 + 200);

	drawSprites();
}