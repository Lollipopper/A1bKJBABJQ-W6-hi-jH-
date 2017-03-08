function Res(callback){

  /*url    : posizione sprite(cartella/nome)
	frames : numero sprites in immagine
	funct  : funzione facoltativa da eseguire dopo che l'immagine si è caricata
  */
  
	this.resnum		= 0
	this.resloaded	= 0
	this.loading	= false 
	
	this.loadSprite = function(url,frames,funct){
		
		this.loading	= true
		var img = new Image()
		img.src = "Images/" + url
		img.rh = this
		img.frm = frames
		
		this.resnum++
		
		img.onload = function(){
			
			if(funct != undefined){
				
				funct()
				
			}
			
			this.rh.resloaded++
			this.rh.checkloaded()
			
		}
		return img
		
	} 
	
	this.audio = function(url,funct){
		
		this.loading	= true
		
		var audio = new Audio()
		audio.src = "Sounds/" + url
		audio.rh = this
		
		audio.addEventListener("loadeddata", function(){
			
			if(funct != undefined){
				
				funct()
				
			}
			this.rh.resloaded++; 
			this.rh.checkloaded();
		}, false);
		
		return audio
		
	}
	
	this.checkloaded = function(){
		
		if(!this.loading) return null;
		
		this.DrawLoading()
		if(this.resloaded >= this.resnum){
			
			callback()
			this.resnum		= 0
			this.resloaded	= 0
			this.loading	= false
			
		}
		
	}
	
	
	this.DrawLoading = function() {
     
        //percentuale di caricamento
        this.status = (this.resloaded) / (this.resnum);
     
        //centro del canvas
        var cx = game.c.width/2;
        var cy = game.c.height/2;
 
        //imposta il colore di riempimento
        game.ctx.fillStyle = "#333";
 
        //disegna un rettangolo grande quanto il canvas
        game.ctx.fillRect(0, 0, game.c.width, game.c.height);
     
        //avvia il path di disegno primitive
        game.ctx.beginPath();
        game.ctx.strokeStyle = "#222";
        
        //imposta lo spessore della linea da disegnare
        game.ctx.lineWidth = 25;
        
        //aggiunge un arco al path (una corona circolare di raggio 80)
        game.ctx.arc(cx, cy, 80, 0, Math.PI*2, false);
        
        //disegna il path
        game.ctx.stroke();
     
        //calcola i radianti del secondo arco, 
        var radians = (360 * this.status) * Math.PI / 180;
         
        //disegna il secondo arco
        game.ctx.beginPath();
        game.ctx.strokeStyle = "#ddd";
        game.ctx.lineWidth = 25;
        game.ctx.arc(cx, cy, 80, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false);
        game.ctx.stroke();
     
        //Imposta un font e disegna il testo al centro del cerchio di caricamento
        game.ctx.font = '22pt Segoe UI Light';
        game.ctx.fillStyle = '#ddd';
        game.ctx.fillText(Math.floor(this.status*100) + "%",cx-25,cy+10);
    }

}