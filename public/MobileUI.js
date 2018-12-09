var valoare = 0;
var jumpStop = 0;
function UpdateMobileUI(){
	fill(valoare);
	rect(50, windowHeight - 100 ,50 ,50, 5);
	rect(100, windowHeight - 100 ,50 ,50, 5);
	rect(75, windowHeight - 150 ,50 ,50, 5);
	for(var i=0; i<touches.length; i++)
	{
		if(touches[i].x > 50 && touches[i].x <100 && touches[i].y > windowHeight - 100 && touches[i].y < windowHeight - 50){
			player.move(-player.moveSpeed);
			valoare = 100;
		}
		if(touches[i].x > 100 && touches[i].x <150 && touches[i].y > windowHeight - 100 && touches[i].y < windowHeight - 50){
			player.move(player.moveSpeed);
			valoare = 200;
		}
		if(touches[i].x > 75 && touches[i].x <125 && touches[i].y > windowHeight - 150 && touches[i].y < windowHeight - 100){
			if(jumpStop == 0)
			player.jump();
			jumpStop = 1;
			valoare = 200;
		}
	}
}

function touchEnded() {
  jumpStop = 0;
}