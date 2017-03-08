Math.getAngle = function( x1, y1, x2, y2 ) {
	
	var	dx = x1 - x2,
		dy = y1 - y2;
	
	return Math.atan2(dy,dx);
	
};
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false)