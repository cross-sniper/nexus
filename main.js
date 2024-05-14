require("resource-manager.js")

if(std.typeof(settings.window.width) === "number" && std.typeof(settings.window.height) === "number")
{
    raylib.InitWindow(settings.window.width,settings.window.height, "nexus")
}else{
    raylib.InitWindow(800,600, "nexus")
}
winSize = raylib.GetScreenSize()

raylib.SetTargetFPS(settings.window.targetFps||60)

spawn = {x:40,y:20}

player = {
	x:spawn.x,
	y:spawn.y,
	w:20,
	h:20
}

cameraVars = {
    offsetX: 0,
    offsetY: 0,
    targetX: 0,
    targetY: 0,
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
	if(raylib.IsKeyDown(raylib.KEY_W)){
		nextPos.y -= Math.floor(200 * dt)
	}
	if(raylib.IsKeyDown(raylib.KEY_S)){
		nextPos.y += Math.floor(200 * dt)
	}
	if(raylib.IsKeyDown(raylib.KEY_A)){
		nextPos.x -= Math.floor(200 * dt)
	}
	if(raylib.IsKeyDown(raylib.KEY_D)){
		nextPos.x += Math.floor(200 * dt)
	}
	
	if(!(colide = checkCollision({x:nextPos.x,y:player.y}))){
		player.x = nextPos.x
	}
	if(!(colide = checkCollision({y:nextPos.y,x:player.x}))){
		player.y = nextPos.y
	}
	handleDoors(player)
}


while (!raylib.WindowShouldClose()) {

    // Begin drawing
    raylib.BeginDrawing();
    raylib.ClearBackground(BLACK);
    dt = raylib.GetFrameTime()
    move(dt);
    raylib.updateCameraOffset(
    	{
    		x:winSize.width / 2,
    		y:winSize.height / 2,
    	}
    )
    raylib.updateCameraTarget(
    	{
    		x:player.x,
    		y:player.y,
    	}
    );
    raylib.BeginCam();
	drawMap()
    // Draw player
    raylib.DrawRectangle(player.x, player.y, player.w, player.h, (settings.player.Color || BLUE));

    // End rendering with the camera
    raylib.EndCam();
    // Draw debug information
    raylib.DrawText("room id: "+playerCurrentPosition,0,0, 20, WHITE)
    if (settings.debug) {
        raylib.DrawFPS(0,20)
        raylib.DrawText("pos: x:" + player.x + ", y:"+player.y, 0, 40, 20, WHITE);
    }

    // End drawing
    raylib.EndDrawing();
}

raylib.CloseWindow()
