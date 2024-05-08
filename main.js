require("resource-manager.js")
raylib.InitWindow( 800,600, "nexus")
raylib.SetTargetFPS(settings.window.targetFps||60)

spawn = getPlayerSpawn()

player = {
	x:spawn.x,
	y:spawn.y,
	moveCooldown:0,
	moveSpeed: settings.player.speed || 20
}

cameraVars = {
    offsetX: 0,
    offsetY: 0,
    targetX: 400,
    targetY: 300,
    rotation: 0,
    zoom: settings.cam.zoom || 1
}


// Initialize the camera
raylib.initCamera(cameraVars);

function move(dt){
	nextPos = {
		x:player.x,
		y:player.y
	}
	moved = false
	if(raylib.IsKeyDown(raylib.KEY_W) && player.moveCooldown <= 0){
		nextPos.y -= 1
		moved = true
	}
	if(raylib.IsKeyDown(raylib.KEY_S) && player.moveCooldown <= 0){
		nextPos.y += 1
		moved = true
	}
	if(raylib.IsKeyDown(raylib.KEY_A) && player.moveCooldown <= 0){
		nextPos.x -= 1
		moved = true
	}
	if(raylib.IsKeyDown(raylib.KEY_D) && player.moveCooldown <= 0){
		nextPos.x += 1
		moved = true
	}
	if(moved){
		player.moveCooldown = 1
	}

	if(!isGoingToCollide({x:nextPos.x, y:player.y}))
	{
		player.x = nextPos.x
	}
	if(!isGoingToCollide({x:player.x, y:nextPos.y})){
		player.y = nextPos.y
	}
	changeLevel(player)
	if(player.moveCooldown > 0){
		player.moveCooldown -= player.moveSpeed * dt
	}

}


while (!raylib.WindowShouldClose()) {
    // Update camera target

    // Move player

    // Begin drawing
    raylib.BeginDrawing();
    raylib.ClearBackground(BLACK);
    move(raylib.GetFrameTime());
    raylib.updateCameraOffset(
    	{
    		x:400,
    		y:300,
    	}
    )
    raylib.updateCameraTarget(
    	{
    		x:player.x * 40,
    		y:player.y * 40,
    	}
    );

    // Begin rendering with the camera
    raylib.BeginCam();

    // Draw map
    drawMap();

    // Draw player
    if(settings.tiles.drawTileGrid){
	    raylib.DrawRectangle(player.x * 40, player.y * 40, 39, 39, (settings.player.Color || BLUE));
    }else{
	    raylib.DrawRectangle(player.x * 40, player.y * 40, 40, 40, (settings.player.Color || BLUE));
    }
	renderTutorials(currentMap)

    // End rendering with the camera
    raylib.EndCam();
    // Draw debug information
    if (settings.debug) {
		raylib.DrawFPS(0,0)
        raylib.DrawText("moveCooldown: " + player.moveCooldown, 0, 20, 20, BLUE);
        raylib.DrawText("current map: " + currentMap, 0, 40, 20, BLUE);
        raylib.DrawText("pos: x:" + player.x + ", y:"+player.y, 0, 60, 20, BLUE);
        raylib.DrawText("game pos: x:" + player.x*40 + ", y:"+player.y*40, 0, 80, 20, BLUE);
    }

    // End drawing
    raylib.EndDrawing();
}

raylib.CloseWindow()
