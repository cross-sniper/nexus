const Types = {
  Bg: 0, // background tile
  Wall: 1, // wall tile
  Door: 2, // door tile
};

const map = {
  1: [
    Bg(0, 0, 600, 200, DARKGREY),
    Wall(0,0,600,20,RED),
    Wall(0, 0,20,200,RED),
    Wall(580,0,20,200,RED ),
    Wall(0, 200, 600, 20, RED ),
    Door(560,20,20,20,GREEN, 2, Vec2(40,40))
  ],
  2: [
    Bg(0, 0, 600, 100, DARKGREY),
    Bg(540, 0, 60, 400, DARKGREY),
    Wall(0,0,600,20,RED),
    Wall(0, 0,20,100,RED),
    Wall(600,0,20,400,RED ),
    Wall(540,100,20,300,RED ),
    Wall(0, 100, 540, 20, RED ),
    Wall(540,400,80,20,RED),
    Door(20,20,20,20,GREEN, 2, Vec2(40,40)),
    Door(560,380,20,20,GREEN, 3, Vec2(40,40))
  ],
  3: [
    Bg(0, 0, 600, 100, DARKGREY),
    // TODO: map level 3
  ]
};

var playerCurrentPosition = 1;

function DrawTile(tile) {
  raylib.DrawRectangle(tile.x, tile.y, tile.w, tile.h, tile.color);
}

function drawMap() {
  const tiles = map[playerCurrentPosition];
  if (!tiles) {
    print("Error: Undefined map for player position");
    return;
  }
  for (var i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    DrawTile(tile);
  }
}

function handleDoors(pos) {
  const tiles = map[playerCurrentPosition];
  if (!tiles) {
    print("Error: Undefined map for player position");
    return;
  }
  for (var i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    if (
      pos.x < tile.x + tile.w &&
      pos.x + player.w > tile.x &&
      pos.y < tile.y + tile.h &&
      pos.y + player.h > tile.y
    ) {
      if (tile.type === Types.Door) {
        playerCurrentPosition = tile.leads;
        player.x = tile.entrance.x;
        player.y = tile.entrance.y;

        return;
      }
    }
  }
}

function checkCollision(pos) {
  const tiles = map[playerCurrentPosition];
  if (!tiles) {
    print("Error: Undefined map for player position");
    return null;
  }
  for (var i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    if (
      pos.x < tile.x + tile.w &&
      pos.x + player.w > tile.x &&
      pos.y < tile.y + tile.h &&
      pos.y + player.h > tile.y
    ) {
      if (tile.type === Types.Wall) {
        return tile;
      }
    }
  }
  return null;
}
