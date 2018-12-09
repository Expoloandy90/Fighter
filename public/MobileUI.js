var valoare = 0;
function UpdateMobileUI(){
	fill(valoare);
	rect(50, windowHeight - 100 ,50 ,50, 5);
	rect(100, windowHeight - 100 ,50 ,50, 5);
	for(var i=0; i<touches.length; i++)
	{
		if(touches[i].x > 50 && touches[i].x <100){
			player.move(-player.moveSpeed);
			valoare = 100;
		}
		if(touches[i].x > 100 && touches[i].x <150){
			player.move(player.moveSpeed);
			valoare = 200;
		}
	}
	//text(frameRate() , player.s.position.x, player.s.position.y);
}