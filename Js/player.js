function player(){

	this.vector = new Vector(game.c.width / 2,game.c.height / 2,82,87,game.persd)
	this.vector.offsety=0;
	this.vector.offsetx=0;
	this.vector.IndexX = 0;
	this.vector.IndexY = 0;
	this.vector.IndexW = 420;
	this.vector.IndexH = 1517;
	this.vector.currentImage = this.vector.img
	
	this.vector.draw = function(){
		
		game.ctx.drawImage(this.currentImage,this.IndexW*this.IndexX,0,this.IndexW,this.IndexH,this.x,this.y,this.IndexW/8,this.IndexH/8)
		
	}
	
	this.vector.update = function(){
		
		this.angle = Math.getAngle(this.x + this.w/2,this.y+this.h/2,Inputs.mouseX,Inputs.mouseY) * (180/Math.PI)
		
		if(this.x <= 80){
			
			this.x+=5
			this.offsetx += 5
			
		}else if(this.x + this.w >= game.c.width- 80){
			
			this.x-=5
			this.offsetx -= 5
		
		}else if(this.y + this.h + 10>= game.c.height- 80){
			
			this.y-=5
			this.offsety -= 5
		
		}else if(this.y <= 80){
			
			this.y+=5
			this.offsety += 5
		}
		if(this.angle >= 45 && this.angle < 135 ){
			this.currentImage = game.persu
			this.IndexW = 420
		}else if(this.angle >= -135 && this.angle < -45){
			this.currentImage = game.persd
			this.IndexW = 420
		}else if(this.angle >= -45 && this.angle < 45){
			this.currentImage = game.persl
			this.IndexW = 534
		}else{
			this.currentImage = game.persr
			this.IndexW = 534
		}
		
		if(Inputs.key[37] == true||Inputs.key[65] /*passi <= 3*/){ //1
			game.rsp.play()
			if(game.level.tick){
			
			this.IndexX++;
			}
			this.x -= 5
			if (this.IndexX > 10){
				
				//passi++
				this.IndexX = 0;
				
			}
		
		}else if(Inputs.key[38] == true||Inputs.key[87]){
			
			game.rsp.play()
			if(game.level.tick){
				this.IndexX++;
			}
			this.y -= 5
			
			if (this.IndexX > 10){
				
				this.IndexX = 0;
				
			}
		
		}else if(Inputs.key[39] == true||Inputs.key[68]/*passi >= 3 && passi <= 6*/){  //2
			
			game.rsp.play()
			
			if(game.level.tick){
				this.IndexX++;	
			}
			this.x += 5
			if (this.IndexX > 10){
				
				this.IndexX = 0;
				//passi++
			}
			
		}else if(Inputs.key[40] || Inputs.key[83]){
			
			game.rsp.play()
			if(game.level.tick){
			
				this.IndexX++;
			
			}
			this.y += 5
			if (this.IndexX > 10){
				
				this.IndexX = 0;
				
			}
			
		}else{
			
			game.rsp.pause()
			game.rsp.currentTime = 0
			
		}
		
	}
	
	return(this.vector)
	
}

