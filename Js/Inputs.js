TOUCH_1 = 1;
MOUSE_LEFT   = 1;
MOUSE_MIDDLE = 2;
MOUSE_RIGHT  = 3;
KEY_LEFT  = 37;
KEY_RIGHT = 39;
KEY_UP    = 38;
KEY_DOWN  = 40;
KEY_ENTER = 13;
KEY_ESC   = 27;
KEY_CTRL  = 17;
KEY_SPACE = 32;

Inputs = function() {}
 
Inputs.mouseX = 0;
Inputs.mouseY = 0;
 
Inputs.mouseLeft = false;
Inputs.mouseLeftPress = false;
Inputs.mouseLeftRel = false;
Inputs.mouseRight = false;
Inputs.mouseRightPress = false;
Inputs.mouseRightRel = false;
 
Inputs.key = [];
Inputs.keyPress = [];
Inputs.keyRel= [];

window.addEventListener("keydown", function(e) {
     
    if(!Inputs.key[e.keyCode]) {
     
        Inputs.keyPress[e.keyCode] = true;
        Inputs.key[e.keyCode] = true;
    }
 
}, false);
 
 
window.addEventListener("keyup", function(e) {
     
    Inputs.keyRel[e.keyCode] = true;
    Inputs.key[e.keyCode] = false;
 
}, false);

window.addEventListener("mousedown",function(e){	

		Inputs.mouseLeft = true
		Inputs.mouseLeftPress = true		
		
	
},false)
window.addEventListener("mouseup",function(e){
	
	
		Inputs.mouseLeft = false
		Inputs.mouseLeftRel = true		
	
},false)

window.addEventListener("mousemove",function(e){
	
	Inputs.mouseX = e.pageX
	Inputs.mouseY = e.pageY
	mouseMoved = true
	
},false)
	
Inputs.MouseInsideRect = function(x,y,w,h) {
    
   return (Inputs.mouseX >= x && Inputs.mouseY >= y && Inputs.mouseX <= x+w && Inputs.mouseY <= y+h);
   
}

Inputs.MouseInsideText = function(s,x,y,h,colA,colB) {
    
	var w = game.lol.measureText(s).width
	var h = h
	
	var inside = (Inputs.mouseX >= x && Inputs.mouseY >= y && Inputs.mouseX <= x+w && Inputs.mouseY <= y+h);
	
	game.lol.font = h+"px Arial"
	if(inside){
		
		game.lol.fillStyle = colA
		
	}else{
		
		game.lol.fillStyle = colB
		
	}
	game.lol.fillText(s,x,y+h)
	return inside
   
}


Inputs.Clear = function(){
	
	Inputs.mouseLeftPress = false;
	Inputs.mouseLeftRel = false;
	Inputs.mouseRightPress = false;
	Inputs.mouseRightRel = false;
	Inputs.mouseMiddlePress = false;
	Inputs.mouseMiddleRel = false;
	Inputs.mouseMoved = false
	
	Inputs.keyPress = [];
	Inputs.keyRel= [];
	
}
