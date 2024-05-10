const Types = {
  Bg: 0, // background tile
  Wall: 1, // wall tile
  Door: 2, // door tile
};

const map = {
  1: [
    { type: Types.Bg, x: 0, y: 0, w: 600, h: 300, color: DARKGREY },
    { type: Types.Wall, x: 0, y: 0, w: 600, h: 20, color: RED },
    { type: Types.Wall, x: 0, y: 0, w: 20, h: 300, color: RED },
    { type: Types.Wall, x: 580, y: 0, w: 20, h: 300, color: RED },
    { type: Types.Wall, x: 0, y: 300, w: 600, h: 20, color: RED },
    {
      type: Types.Door,
      x: 20,
      y: 20,
      w: 20,
      h: 20,
      color: GREEN,
      leads: 2,
      entrance: { x: 500, y: 40 },
    },
  ],
  2: [
    { type: Types.Bg, x: 0, y: 0, w: 600, h: 300, color: DARKGREY },
    { type: Types.Wall, x: 0, y: 0, w: 600, h: 20, color: RED },
    { type: Types.Wall, x: 0, y: 0, w: 20, h: 300, color: RED },
    { type: Types.Wall, x: 580, y: 0, w: 20, h: 300, color: RED },
    { type: Types.Wall, x: 0, y: 300, w: 600, h: 20, color: RED },
    {
      type: Types.Door,
      x: 500,
      y: 20,
      w: 20,
      h: 20,
      color: GREEN,
      leads: 1,
      entrance: { x: 50, y: 20 },
    },
  ],
};

var playerCurrentPosition = 2;

function DrawTile(tile) {
  raylib.DrawRectangle(tile.x, tile.y, tile.w, tile.h, tile.color);
}

function drawMap() {
  const tiles = map[playerCurrentPosition];
  if (!tiles) {
    console.error("Error: Undefined map for player position");
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
    console.error("Error: Undefined map for player position");
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
    console.error("Error: Undefined map for player position");
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
