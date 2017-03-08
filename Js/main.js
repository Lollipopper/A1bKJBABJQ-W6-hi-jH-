window.onload = function(){start()};

function Game(){

	console.log(document.getElementById("readme").innerHTML)
	this.c = document.getElementById("c");
	this.ctx = this.c.getContext("2d");
	this.c.style.left = "0px"
	this.c.style.top = "0px"
	this.c.style.position = "absolute"
	this.c.width = window.innerWidth  
	this.c.height= window.innerHeight 
	this.c.style.cursor = "none"
	this.playMusic = true;
	this.tickxframe = 3;
	this.tick =0;
	this.movetick =0;
	this._lol =0;
	this.pallottole = [];
	this.hermionx = 500;
	this.hermiony = 500;
	this.vita = 100
	this.coso = false
	this.vit = true
	this.IndexX = 0;
	this.IndexY = 0;
	this.Indexx = 0;
	this.Indexy = 0;
	this.i = 0
	this.pause = false
	this.mov = [0,1,2,1]     
	
	
	
	//resource loader
	rh = new Res(function(){
		
		game.LoadLevel(0)
		game.GameLoop()
	
	})
	
//Imagini
	
	//personaggio
	this.persl			= rh.loadSprite("alienol.png")
	this.persd			= rh.loadSprite("alienod.png")
	this.persu			= rh.loadSprite("alienou.png")
	this.persr			= rh.loadSprite("alienor.png")
	
	//nemico
	this.enemyl			= rh.loadSprite("enemyl.png")
	this.enemyd			= rh.loadSprite("enemyd.png")
	this.enemyu			= rh.loadSprite("enemyu.png")
	this.enemyr			= rh.loadSprite("enemyr.png")
	
	//altro
	this.cuori 			= rh.loadSprite("cuori.gif")
	this.cursor 		= rh.loadSprite("cursor.gif")
	this.menuimg 		= rh.loadSprite("titolomenu.png")
	
//Audio

	this.l				= rh.audio("profd.mp3")
	this.you_lost 		= rh.audio("you-lost.wav")
	this.sndMusic		= rh.audio("GameMenu.mp3")
	this.gun			= rh.audio("gun.wav")
	this.rsp			= rh.audio("resp.wav")
	this.rspe			= rh.audio("resp.wav")
	
	//p% = W/G
	this.percx = this.c.width / 1920
	this.percy = this.c.height / 950
	this.GameLoop = function(){
		
		if(!this.pause){
		this.update()
		}
		if(this.vit){
			this.draw()
		}
		window.requestAnimationFrame(function (){game.GameLoop()})
	
	}
	
	this.colpoX = this.x
	this.colpoY = this.y
	
	this.draw   = function(){
		
		//this.c.width = window.innerWidth  
		//this.c.height= window.innerHeight 
		this.ctx.clearRect(0,0,this.c.width,this.c.height)
		
		if(this.currentLevel == 0){
			
			this.menu.draw()
		
		}else if(this.currentLevel == 1){
			
			this.level.draw()
		
		}else if(this.currentLevel == "win"){
			
			this.win.draw()
		
		}
		
		/*this.ctx.drawImage(this.pers,w*this.IndexX,h*this.IndexY,w,h,this.x,this.y,82,87)
		//this.ctx.drawImage(this.nemico,w*this.Indexx,h*this.Indexy,w,h,this.hermionx,this.hermiony,82,87)
		//this.ctx.fillStyle = "red"
		//this.ctx.fillRect(30,30,(675/5)*(this.vita/100),132/5-1)
		//this.ctx.drawImage(this.cuori,30,30,675/5,132/5)
		//this.ctx.drawImage(this.colpo,this.colpoX +45,this.y)
		//
		//
		//this.Materializzazione()
		//
		this.move()
		*/
		this.ctx.drawImage(this.cursor,Inputs.mouseX-17,Inputs.mouseY-17)
		
	}
	
  /*this.move = function(){
		
		var distX 	= this.x - this.hermionx
		var distY 	= this.y - this.hermiony
		var dist  	= Math.sqrt(distX*distX + distY*distY)
		
		distX /= dist
		distY /= dist
		
		if (dist <= 400 && dist > 1){
			
			this.hermionx += (distX/100)*400
			this.hermiony += (distY/100)*400
			
		}
		
		if (this.vita == 0){
			
			this.gameOver()
			
		}
		
		
		if (this.movetick > this.tickxframe + 20){
			
			if (dist <= 2 && this.vita >= 1){
				
				this.vita -= 4; 
				this.l.playbackRate = 2
				this.l.play()
				this.sndMusic.volume = 0.1
				this.sndMusic.playbackRate += 0.05
				
				
			console.log(this.vita)
			}else if(this._lol > this.tickxframe * 55 && this.vita < 100){
			
				this.vita+= 4
				this._lol = 0
				this.sndMusic.playbackRate -= 0.05
			
			}else{
				
				this.sndMusic.volume = 1
				
			}
			
			this.movetick = 0
		
		}
	}*/
	
	
	this.update = function(){
		
		
		this.tick ++;
		this.movetick ++;
		this._lol ++;
		
		
		if (this.currentLevel == 1){
			
			this.level.update()
			
		}			
	
		if(Inputs.keyPress[32]){
			
			
			if(this.pause){
			this.pause = false
			}
			if(!this.pause){
			this.pause = true
			}
			
		}
		
		Inputs.Clear()
	
	}
	
	this.LoadLevel = function(lev){
		
		this.currentLevel = lev
		
		if(lev == 0){
			
			this.menu = new Menu
			
		}else if(lev == 1){
			
			this.level = new Level1
			this.level.setup()
			
		}else if(lev == "win"){
			
			this.win = new YouWin
			
		}
		
	}
	
	
	this.gameOver = function(){
		
		this.you_lost.play()
		this.vit = false		
		this.ctx.fillStyle = "white"
		this.ctx.clearRect(0,0,this.c.width,this.c.height)
		this.ctx.font = "75px pixeled "
		this.ctx.fillText("YOU LOST",this.c.width/2-100,this.c.height/2-100)
	
	}
	
	
}   
	
function Vector(x,y,w,h,img){
	
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	
	if(img != undefined){
		this.img = img
	}
	var i = 0
	var distX    = 0
	var distY    = 0
	var dist     = 0
	this.moveto = function(vec,vel){

		distX 	= vec.x - vec.offsetx - this.x
		distY 	= vec.y - vec.offsety - this.y
		
		dist  	= Math.sqrt(distX*distX + distY*distY)
		distX /= dist
		distY /= dist
		i+= 1
		if(dist >= 2){
		this.x += (distX/100)*vel
		this.y += (distY/100)*vel
		}

	}
	this.movetoEndless = function(vec,vel){

		if(i == 0){
		distX 	= vec.x - this.x
		distY 	= vec.y - this.y
		
		dist  	= Math.sqrt(distX*distX + distY*distY)
		distX /= dist
		distY /= dist
		}
		i+= 1
		if(dist > 2){
		this.x += (distX/100)*vel
		this.y += (distY/100)*vel
		}
		
	}
	
	this.Collides = function(b){
		return !(this.x + this.w < b.x || b.x + b.w < this.x || this.y + this.h < b.y || b.y + b.h < this.y);
	}
	
	this.draw = function(){
		
		if(img != undefined){
			game.ctx.drawImage(this.img,this.x,this.y,this.w,this.h)
		}
	}
	this.dist = function(vec){
		
		dist2X 	= vec.x - vec.offsetx - this.x
		dist2Y 	= vec.y - vec.offsety - this.y
		    
		dist2  	= Math.sqrt(dist2X*dist2X + dist2Y*dist2Y)
		
		return(dist2)
		
	}
	
}   
	
function start(){
	
	game = new Game()
	
}

	