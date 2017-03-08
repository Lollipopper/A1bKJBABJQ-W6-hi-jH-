function Menu(){
	
	game.sndMusic.play()
	game.sndMusic.loop = true
	
	this.draw = function(){
		
		game.ctx.drawImage(game.menuimg,0,0,game.c.width,game.c.height)
		if(Inputs.MouseInsideRect(595 * game.percx, 481 * game.percy, 725* game.percx, 65* game.percy)&& Inputs.mouseLeft){
			
			game.LoadLevel(1)
			
		}
		
	}
	
	
}
function Level1(){
	
	var passi 				= 0
	game.sndMusic.volume 	= 0.05
	game.rsp.playbackRate 	= 1.4
	this.bullets 			= []
	this.enemys	 			= []
	this.tick 				= false
	this.lol 				= "sby"
	this.player 				= new player()
	this.enemy 				= new enemy(500,100)
	
	var w = 84,h = 87;
	
	this.setup = function(){
		
		for(i = 0; i < 5; i++){
			
			this.enemys.push(new enemy(Math.random()*6000+800,Math.random()*200))
			
		}
		
	}
	
	this.draw = function(){
		
		this.player.draw()
		//this.enemy.draw()
		
		for(i = 0; i < this.enemys.length; i++){
			
			this.enemys[i].draw()
		}
		
		for(i = 0; i<this.bullets.length; i++){
			
			game.ctx.fillRect(this.bullets[i].vec.x,this.bullets[i].vec.y,this.bullets[i].vec.w,this.bullets[i].vec.h)
			
		}
		
		game.ctx.fillRect(800 + this.player.offsetx,500 + this.player.offsety,100,100)
	
	}
	
	this.update = function(){
		
		
		if(Inputs.mouseLeftPress){
			
			game.gun.currentTime = 0
			this.bullets.push({vec: new bullet(this.player.x,this.player.y + 50), tx: Inputs.mouseX, ty: Inputs.mouseY})
			game.gun.play()
			
		}
		
		
		
		for(i = 0; i<this.bullets.length; i++){
			
			this.bullets[i].vec.movetoEndless(new Vector(this.bullets[i].tx,this.bullets[i].ty),1000) 
			
			for(j = 0; j < this.enemys.length; j++){
				
				
				if(this.bullets[i].vec.Collides(this.enemys[j])){
					
					this.enemys[j].lives -- 
					this.bullets.splice(i,1)
					break;
					
				}
			}
			
		}
		
		
		//tick
		if (game.tick > game.tickxframe){          
		
			this.tick = true
			game.tick = 0
		
		}

		if(this.enemys.length == 0){
			
			game.LoadLevel("win")
			
		}
		//persss
		
		for(i = 0; i < this.enemys.length; i++){
			
			this.enemys[i].update()
			
			if(this.enemys[i].dist(this.player) > 100){
				this.enemys[i].move()
			}else{
				
				this.enemys[i].moveto(this.player,30)
				
			}
			
			if(this.enemys[i].lives <= 0){
				
				this.enemys.splice(i,1)
				
			}
			
		}
		
		this.player.update()
		
		//vol
		if (Inputs.key[107]){
				
		 	if (game.sndMusic.volume  < 0.9){			
		 	
		 		game.sndMusic.volume += 0.01;
		 	
		 	}
		 	
		 }
			
		if (Inputs.key[109]){
			if (game.sndMusic.volume  > 0.01){			
		
			game.sndMusic.volume -= 0.01;
			
			}
		}	
		var i = 0
			
		if(Inputs.key[77]&&game.playMusic){
			
			game.sndMusic.volume = 0;
			game.playMusic = false
			
		}else if(Inputs.key[77]&&!game.playMusic){
			
			game.sndMusic.volume = 1;
			game.playMusic = true
			
		}
		
		this.tick = false
	}
	
}
function YouWin(){
	
	this.draw = function(){
		
		game.ctx.fillText("You Win",game.c.width/2, game.c.height/2)
		
	}
	this.update = function(){
		
		
		
	}
	
}

function bullet(x,y){
	
	this.vec = new Vector(x,y + 50,5,5)	
	this.vec.Collides = function(b){
		return !(this.x + this.w < b.x + game.level.pers.offsetx || b.x + b.w + game.level.pers.offsetx< this.x || this.y + this.h < b.y + game.level.pers.offsety || b.y + b.h + game.level.pers.offsety< this.y);
	}	
	
	return this.vec
}