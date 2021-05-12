// JavaScript Document
//declara todas las variables globales
var puntuacion=0;
var character;
var Abajo;
var Arriba;
var Derecha;
var Izquierda;
var moneda;
var x;
var y;
var escal_charac=0.5;
var escal_moneda=0.04;
var fondojuego;


// El estado jugando tiene tres métodos básicos: preload, create y update
var level1 = {
	preload: function() {        // se cargan todas la imágenes en el preload
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;   // se escala la imagen al reducir el tamaño de la ventana
		game.load.image('fondol1', 'imagenes/fondo1.5.jpg');//la imagen del fondo del juego
		game.load.spritesheet('character', 'imagenes/robot2.png', 69.75, 120, 8); //se sube el png del personaje con una dimensión de 69.75px de ancho, 120px de alto y 8 frames
		game.load.image("moneda", "imagenes/moneda.png"); //se carga la imagen de las monedas
	},
	
	create: function() {           // crea los actores y muestra las imágenes
		 
		fondojuego = game.add.tileSprite(0, 0, 626, 305, "fondol1"); //Agrega fondo del nivel
		fondojuego.scale.setTo(1.55); 
        game.physics.startSystem(Phaser.Physics.ARCADE); // se activan las físicas del juego de la biblioteca phaser

        //se le da la ilusion de movimiento
		character = game.add.sprite(69.9, 120, "character"); //se agrega el objeto character en este caso nuestro personaje
		character.anchor.setTo(0.5); // se ubica el centro en la mitad de la imagen
		character.scale.setTo(escal_charac); //se escala la imagen en un tamaño que se pueda jugar
		move= character.animations.add('move'); //se le agrega la animación al personaje
		character.animations.play('move', 7, true); //se le pone una velocidad de animación en el cual se pueda apresiar un movimiento
		game.physics.arcade.enable(character); //se le agregan físicas al objeto
        
        
        //se generan balas con la ilusión que aparezcan desde la parte derecha

        this.puntaje_texto = this.add.text(10, 20, 'puntaje: '+puntuacion, { fontSize: '22px', fill: "#1517E9" });// Puntajes
		this.level = this.add.text(game.width-50, 20, 'lvl 1 ', { fontSize: '22px', fill: "#1517E9" });
		
        
		x=Math.floor(game.width);//una posiuión fija que da la ilusión de que la moenda viene de la parte derecha
        y=Math.floor(Math.random()*game.height/1.5+100); // una posición aleatoria en y para que el jugador no pueda predecir de donde viene
        moneda= game.add.image(x,y,"moneda"); //la ecuación que agrega la posición del objeto
        moneda.scale.setTo(escal_moneda, escal_moneda);  // escala el tamaño de la moneda
        moneda.anchor.setTo(0.5) //Ubica el centro de la moneda
		game.physics.arcade.enable(moneda); // se le agregan físicas al objeto
		
        
        //se agregan los botones de juego
        Abajo = game.input.keyboard.addKey(Phaser.Keyboard.UP);  
		Arriba = game.input.keyboard.addKey(Phaser.Keyboard.DOWN); 
		Derecha = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		Izquierda= game.input.keyboard.addKey(Phaser.Keyboard.LEFT); 
		character.body.collideWorldBounds = true; //  se le agrega la funcion body.collideWorldBounds  para que el personaje no pueda irse más allá de los pixeles de la pantalla
		},


    
	update: function(){                // ejecuta de manera reiterativa
    	fondojuego.tilePosition.x -=1; //  se le agrega un movimiento al fondo que de la sensación de que el personaje se mueve
		moneda.position.x-= 1; //le agrega un efecto de movimiento a las moendas de derecha a izquierda
		
	
		if(moneda.position.x<-1){    //si el objeto llega a pasa por la parte izquierda de la pantalla activa la funcion tocar que borra el objeto y crea uno en la parte derecha con una posición aleatoria en x       
		this.tocar_moneda(moneda);
		}	
		if(Izquierda.isDown){          //  una función if en caso de que el jugador pulse izqu
			character.scale.setTo(-escal_charac,escal_charac);
			character.position.x-= 3;       //  El personaje se mueve a la Izquierda
            fondojuego.tilePosition.x +=2; //se mueve el fondo -2 para que contrarreste el +1 que se mueve siempre
			moneda.position.x += 0.5; // se realentiza la velocidad de la moneda para que de un efecto de que el personaje está retrocediendo
		}
		if(Derecha.isDown){ //  una función if en caso de que el jugador pulse der
			character.scale.setTo(escal_charac,escal_charac);
			character.position.x += 3;        // El personaje se mueve a la derecha
            fondojuego.tilePosition.x -=1; // Mueve el fondo
			moneda.position.x -= 2; // se aumenta la velocidad de la moneda para que de un efecto de que el personaje está avanzando
		}	
		if(Arriba.isDown){ //  una función if en caso de que el jugador pulse arriba
			character.scale.setTo(escal_charac,escal_charac);
			character.position.y += 3;        // El personaje se mueve hacia arriba
		}	
        		if(Abajo.isDown){ //  una función if en caso de que el jugador pulse abajo
			character.scale.setTo(escal_charac,escal_charac);
			character.position.y -= 3;        // El personaje se mueve hacia abajo
		}	
		
      //en caso 
		this.colisiones (); //correa una función que analiza si existe colisión entre el personaje y los objetos y midifica el opuntaje

		
	},
	
	colisiones: function(){

        var difx_moneda= Math.abs(character.position.x- moneda.position.x);
        var dify_moneda= Math.abs(character.position.y-moneda.position.y);
     if(difx_moneda< 25 && dify_moneda< 65){this.tocar_moneda(moneda);         
		puntuacion += 1; //aumenta elpuntaje en uno en caso de que el personaje toque la moneda
		this.puntaje_texto.setText('puntaje: ' + puntuacion);//Actualiza el puntaje en caso de que los objetos se toquen 
		} 
         //Considicion de paso al siguiente nivel
        if(puntuacion>9){
            game.state.start("level2");   // en caso de que cumpla con un puntaje mayor a 15 llega al lvl 2 (CAMBIO DE ESCENARIO)
        }
        if(puntuacion<0){
            game.state.start("lose");   // si su puntaje llega a menos de 0 vuelve a pantalla de inicio (CAMBIO DE ESCENARIO)
        }
	},
	    tocar_moneda: function(objeto){//El parámetro de entrada es una bala cualquiera y retorna una bala en una nueva posición
        objeto.alpha=0;
        x=Math.floor(game.width);//Posición aleatoria en x
        y=Math.floor(Math.random()*game.height/1.3+100);  //Posición aleatoria en y
        moneda= game.add.image(x,y,"moneda"); //agrega una bala en la posición aleatoria
        moneda.scale.setTo(escal_moneda, escal_moneda); // escala el tamaño de la bala
        moneda.anchor.setTo(0.5); //Ubica el centro de la bala

        this.puntaje_texto.setText('puntaje: ' + puntuacion);//Actualiza el puntaje      
    },


	
}

