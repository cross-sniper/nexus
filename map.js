require("Tile.js")
var currentMap = 1

const Types = {
	AIR:0,// DARKGRAY
	WALL:1, // WHITE
	PLAYER_SPAWN:2, // DARKGRAY
	NEXT_LEVEL:3,// GREEN
	PREV_LEVEL:4, // RED
	PADDING: 5//BLACK , pads the map array, doesn't really do much else
}

const Maps_id_list = {
	1:[
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,3,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1],
	],
	2:[
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,0,1,0,0,0,1,3,1,5,5,5,5,1,0,1],
		[1,0,0,1,0,1,0,1,0,1,5,5,5,5,1,0,1],
		[1,0,0,1,0,1,0,1,0,1,5,5,5,5,1,0,1],
		[1,0,0,1,0,1,0,1,0,1,5,5,5,5,1,0,1],
		[1,0,0,0,0,1,0,0,0,1,5,5,5,5,1,0,1],
		[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	],
	3:[
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,4,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[5,5,5,1,1,1,1,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[5,5,5,1,0,0,0,0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[5,5,5,1,3,0,0,0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[5,5,5,1,0,0,0,0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[5,5,5,1,0,0,0,0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[5,5,5,1,0,0,0,0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[5,5,5,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1],
		[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[5,5,5,5,5,5,5,5,5,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	],
	4:[
		[1,1,1,1,1,1,1],
		[1,0,0,0,0,0,1],
		[1,0,0,0,0,0,1],
		[1,0,0,2,0,0,1],
		[1,0,0,0,0,0,1],
		[1,0,0,0,0,0,1],
		[1,1,1,1,1,1,1],
	]
}

// Clear the Maps object
const Maps = {};

// Function to transform old map data to new Tile objects
function transformMap(mapData) {
    const newMap = [];
    for (var y = 0; y < mapData.length; y++) {
        const row = [];
        for (var x = 0; x < mapData[y].length; x++) {
            const tileId = mapData[y][x];
            var tileType, tileColor;

            // Determine tile type and color based on tileId
            switch (tileId) {
                case Types.AIR:
                    tileType = Types.AIR;
                    tileColor = DARKGRAY;
                    break;
                case Types.WALL:
                    tileType = Types.WALL;
                    tileColor = WHITE;
                    break;
                case Types.PLAYER_SPAWN:
                    tileType = Types.PLAYER_SPAWN;
                    tileColor = DARKGRAY;
                    break;
                case Types.NEXT_LEVEL:
                    tileType = Types.NEXT_LEVEL;
                    tileColor = GREEN;
                    break;
                case Types.PREV_LEVEL:
                    tileType = Types.PREV_LEVEL;
                    tileColor = RED;
                    break;
                default:
                    tileType = Types.AIR;
                    tileColor = BLACK;
                    break;
            }

            // Create and push the new Tile object
            row.push(new Tile(tileColor, tileType));
        }
        newMap.push(row);
    }
    return newMap;
}

// Transform and populate Maps with the old map data
for (var mapId in Maps_id_list) {
    if (Maps_id_list[mapId]) {
        const mapData = Maps_id_list[mapId];
        Maps[mapId] = transformMap(mapData);
    }
}

function isOutOfScreen(pos, player, screenWidth, screenHeight) {
    // Calculate the position of the tile relative to the player
    const tileX = (pos.x - player.x) * 40 * (1 / settings.cam.zoom || 1); // Adjust for zoom
    const tileY = (pos.y - player.y) * 40 * (1 / settings.cam.zoom || 1); // Adjust for zoom

    // Check if the tile is out of the screen bounds
    if (tileX < -screenWidth / 2 || tileX > screenWidth / 2 ||
        tileY < -screenHeight / 2 || tileY > screenHeight / 2) {
        return true; // Tile is out of the screen
    } else {
        return false; // Tile is within the screen
    }
}
function drawMap(){
	for(var y = 0; y < Maps[currentMap].length; y++){
		for(var x = 0; x < Maps[currentMap][y].length; x++){
		    // Check if the tile is out of the screen bounds
            const tilePos = { x:x, y:y };
			win = raylib.getScreenSize();
			windowWidth = win.width;
			windowHeight = win.height;
            if(isOutOfScreen(tilePos, player, windowWidth, windowHeight)){
                // Skip rendering if the tile is out of the screen
            }else{
				Maps[currentMap][y][x].draw(x*40,y*40)
            }
		}
	}
}


function changeLevel(player){
	try{
		
	if(Maps[currentMap][player.y][player.x]){
	    if (Maps[currentMap][player.y][player.x].type === Types.NEXT_LEVEL) {
	        newState(currentMap)
	        currentMap++;
	        const spawn = getPlayerSpawn();
	        player.x = spawn.x;
	        player.y = spawn.y;
	    }

	    else if (Maps[currentMap][player.y][player.x].type === Types.PREV_LEVEL) {
	        newState(currentMap)
	        currentMap--;
	        const spawn = getPlayerSpawn();
	        player.x = spawn.x;
	        player.y = spawn.y;
	    }
	}
	}catch(e){
		print(e)
	}
}


function isGoingToCollide(player) {
    try {
        if (Maps[currentMap] && Maps[currentMap][player.y] && Maps[currentMap][player.y][player.x]) {
            return Maps[currentMap][player.y][player.x].type === Types.WALL;
        } else {
            return true;
        }
    } catch (e) {
        print(e);
        print("currentMap:"+currentMap);

        return true; // Returning true to indicate collision in case of error
    }
}


function getPlayerSpawn(){
	raylib.DrawText("finding player spawn", 0, 0, 20, WHITE)
	for(var y = 0; y < Maps[currentMap].length; y++){
		for(var x = 0; x < Maps[currentMap][y].length; x++){

			if(Maps[currentMap][y][x].type == Types.PLAYER_SPAWN){
				return {
					x:x,
					y:y
				}
			}
		}
	}
	print("no spawn found")
	quit(1)
}

