
settings = {
	// controls if debug(fps, move cooldown, etc) information should be drawn, default: false
	debug: true,

	cam:{
		zoom: 2, // default: 1, camera zoom level, accepts whole numbers(non-floating point)
	},
	
	player:{
		// default: BLUE, the color you get drawn as, accepts any "{r:<n>,g:<n>,b:<n>,a:<n>}"
		// color: BLUE,
	},
	
	tiles:{
		// default: false, controlls if the tile grid shold be drawn, accepts boolean(true, false, 0, 1)
		// drawTileGrid: false,
	},
	
	// 0x0 makes raylib go fullscreen, default: 800x600
	// Fullscreen is not yet(fully) supported, so just stick to 800x600
	window:{
		// width:0,
		// height:0,

		// this can change how fast you move, and makes performance worse, so be carefull, default: 60
		// targetFps: 60,
	}
}
