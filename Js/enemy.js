function enemy(x,y){

	this.passi 					= Math.floor(Math.random()*6)
	this.vector 				= new Vector(x,y,534/8,1517/8,game.enemyr)
	this.vector.lol				= 0
	this.vector.lives			= 50
	this.vector.IndexX 			= 0;
	this.vector.IndexY 			= 0;
	this.vector.IndexW 			= 534
	this.vector.IndexH 			= 1517;
	this.vector.currentImage	= this.vector.img
	
	this.vector.draw = function(){
		
		game.ctx.drawImage(this.currentImage,this.IndexW*this.IndexX,0,this.IndexW,this.IndexH,this.x + game.level.player.offsetx,this.y +game.level.player.offsety,this.IndexW/8,this.IndexH/8)
		
		if(this.lives < 50){
			
			game.ctx.save()
			game.ctx.fillStyle = "red"
			game.ctx.fillRect(this.x + game.level.player.offsetx, this.y - 50 + game.level.player.offsety, 100 * (this.lives / 100),10)
			game.ctx.restore()
			
		}
		
	}
	
	this.vector.update = function(){
		
		this.angle = Math.getAngle(this.x + this.w/2,this.y+this.h/2,game.level.player.x-game.level.player.offsetx,game.level.player.y-game.level.player.offsety) * (180/Math.PI)
		
	}
	this.vector.move = function(){
		
		if(this.passi <= 2){ //1
		
			game.rspe.play()
			
			if(game.level.tick){
			
				this.IndexX++;
			
			}
			
			this.currentImage = game.enemyl
			this.x-=3;
			
			if (this.IndexX > 10){
				
				this.passi++
				this.IndexX = 0;
				
			}
		
		}else if(this.passi > 2 && this.passi <= 5){  //2
			
			game.rspe.play()
			
			if(game.level.tick){
				this.IndexX++;	
			}
			
			this.currentImage = game.enemyr
			this.x+=3;
			
			if (this.IndexX > 10){
				
				this.IndexX = 0;
				this.passi++
				
			}
			
		}else{
			
			this.passi = 0
			
		}
		
	}
	
	return(this.vector)
	
}