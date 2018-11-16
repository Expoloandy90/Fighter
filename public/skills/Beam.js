var bullets;

function Beam(){
	var bullet = createSprite(player.s.position.x, player.s.position.y, 50, 20);
    bullet.attractionPoint(10, camera.mouseX, camera.mouseY);
    bullet.life = 100;
    bullets.add(bullet);
}