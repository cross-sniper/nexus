function Tile(color, type)
{
	this.color = color
	this.type = type
	this.draw = function(x,y){
	    if(settings.tiles.drawTileGrid){
			raylib.DrawRectangle(x, y, 40, 40, this.color == WHITE ? BLACK : WHITE)
			raylib.DrawRectangle(x, y, 39, 39, this.color)
	    }else{
			raylib.DrawRectangle(x, y, 40, 40, this.color)
	    }
	}
}
