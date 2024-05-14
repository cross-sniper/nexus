function Vec2(x,y){
	return {x:x,y:y}
}

function Bg(x,y,w,h, color){
	return {x:x, y:y, w:w,h:h, color:color, type:Types.Bg}
}
//     { type: Types.Wall, x: 0, y: 0, w: 600, h: 20, color: RED },
function Wall(x,y,w,h,color){
	return { type: Types.Wall, x: x, y: y, w: w, h: h, color: color }
}

function Door(x, y, w, h, color, leadsTo, exitsAt){
	return {
	      type: Types.Door,
	      x: x,
	      y: y,
	      w: w,
	      h: h,
	      color: color,
	      leads: leadsTo,
	      entrance: exitsAt,
	    }
}
