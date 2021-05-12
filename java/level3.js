// JavaScript Document
//declara todas las variables globales
var vidas=5;
var character;
var Abajo;
var Arriba;
var Derecha;
var Izquierda;
var bala;
var bala2;
var bala1;
var x;
var y;
var escal_charac=0.5;
var escal_bala=0.04;
var fondojuego;
var acel=0;
var puntuacion3=0;
// El estado jugando tiene tres métodos básicos: preload, create y update
var level3 = {
	preload: function() {        // se cargan todas la imágenes en el preload
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;   // se escala la imagen al reducir el tamaño de la ventana
		game.load.image('fondol1', 'imagenes/fondo1.7.jpg');//la imagen del fondo del juego
		game.load.spritesheet('character', 'imagenes/robot2.png', 69.75, 120, 8); //se sube el png del personaje con una dimensión de 69.75px de ancho, 120px de alto y 8 frames
        game.load.image("balas", "imagenes/bala.png"); //se carga la imagen de las balas
		game.load.image("moneda", "imagenes/moneda.png"); //se carga la imagen de las monedas
	},
	
	create: function() {           // crea los actores y muestra las imágenes
		 
		fondojuego = game.add.tileSprite(0, 0, 626, 305, "fondol1"); //Agrega fondo del nivel
		fondojuego.scale.setTo(1.55); 
        game.physics.startSystem(Phaser.Physics.ARCADE); // se activan las físicas del juego de la biblioteca phaser

        //se le da la ilusion de movimiento
		character = game.add.sprite(game.width/2, 120, "character"); //se agrega el objeto character en este caso nuestro personaje
		character.anchor.setTo(0.5); // se ubica el centro en la mitad de la imagen
		character.scale.setTo(escal_charac); //se escala la imagen en un tamaño que se pueda jugar
		move= character.animations.add('move'); //se le agrega la animación al personaje
		character.animations.play('move', 7, true); //se le pone una velocidad de animación en el cual se pueda apresiar un movimiento
		game.physics.arcade.enable(character); //se le agregan físicas al objeto
        
        
        //se generan balas con la ilusión que aparezcan desde la parte derecha
        x=Math.floor(game.width);//una posición fija que da la ilusión de que la bala viene de la parte derecha
        y=Math.floor(Math.random()*game.height/1.1+20); // una posición aleatoria en y para que el jugador no pueda predecir de donde viene
        bala= game.add.image(x,y,"balas"); //la ecuación que agrega la posición del objeto
        bala.scale.setTo(escal_bala, escal_bala);  // escala el tamaño de la bala en un tamaño acorde al juego
        bala.anchor.setTo(0.5) //Ubica el centro de la bala
		game.physics.arcade.enable(bala); // se le agregan físicas al objeto
		
		x=Math.floor(game.width+Math.random()*400);//una posición fija que da la ilusión de que la bala viene de la parte derecha
        y=Math.floor(Math.random()*game.height/1.1+20); // una posición aleatoria en y para que el jugador no pueda predecir de donde viene
		bala1= game.add.image(x,y,"balas"); //la ecuación que agrega la posición del objeto
        bala1.scale.setTo(escal_bala, escal_bala);  // escala el tamaño de la bala en un tamaño acorde al juego
        bala1.anchor.setTo(0.5) //Ubica el centro de la bala
		game.physics.arcade.enable(bala1); // se le agregan físicas al objeto

        x=Math.floor(game.width+Math.random()*400);//una posición fija que da la ilusión de que la bala viene de la parte derecha
        y=Math.floor(Math.random()*game.height/1.1+20); // una posición aleatoria en y para que el jugador no pueda predecir de donde viene
		bala2= game.add.image(x,y,"balas"); //la ecuación que agrega la posición del objeto
        bala2.scale.setTo(escal_bala, escal_bala);  // escala el tamaño de la bala en un tamaño acorde al juego
        bala2.anchor.setTo(0.5) //Ubica el centro de la bala
		game.physics.arcade.enable(bala2); // se le agregan físicas al objeto
        this.vida_texto = this.add.text(10, 20, 'vida: '+vidas, { fontSize: '22px', fill: "#FF3511" });// vidas
		this.puntuacion_texto = this.add.text(10, 42, 'puntuacion: '+puntuacion3, { fontSize: '22px', fill: "#46B8FF" });// puntuacion
        this.level = this.add.text(game.width-50, 20, 'lvl 3 ', { fontSize: '22px', fill: "#1517E9" });
		x=Math.floor(game.width);//una posiuión fija que da la ilusión de que la moenda viene de la parte derecha
        y=Math.floor(Math.random()*game.height/1.5+100); // una posición aleatoria en y para que el jugador no pueda predecir de donde viene

		
        
        //se agregan los botones de juego
        Abajo = game.input.keyboard.addKey(Phaser.Keyboard.UP);  
		Arriba = game.input.keyboard.addKey(Phaser.Keyboard.DOWN); 
		Derecha = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		Izquierda= game.input.keyboard.addKey(Phaser.Keyboard.LEFT); 
		character.body.collideWorldBounds = true; //  se le agrega la funcion body.collideWorldBounds  para que el personaje no pueda irse más allá de los pixeles de la pantalla
		},


    
	update: function(){                // ejecuta de manera reiterativa
		acel=acel-0.005
    	fondojuego.tilePosition.x -=1-acel; //  se le agrega un movimiento al fondo que de la sensación de que el personaje se mueve

		bala.position.x-= 1-acel; //le agrega un efecto de movimiento a las balas de derecha a izquierda
		if(bala.position.x<-1){   //si el objeto llega a pasa por la parte izquierda de la pantalla activa la funcion tocar que borra el objeto y crea uno en la parte derecha con una posición aleatoria en x     
		this.tocar_bala(bala);
		puntuacion3 += 1; //cada que el juegador pase una bala este le suma un punto
		this.puntuacion_texto.setText('puntuacion: ' + puntuacion3);
		}	
		

		bala1.position.x-= 1-acel; //le agrega un efecto de movimiento a las balas de derecha a izquierda
		if(bala1.position.x<-1){   //si el objeto llega a pasa por la parte izquierda de la pantalla activa la funcion tocar que borra el objeto y crea uno en la parte derecha con una posición aleatoria en x     
		this.tocar_bala1(bala1)
		puntuacion3 += 1; //cada que el juegador pase una bala este le suma un punto
		this.puntuacion_texto.setText('puntuacion: ' + puntuacion3);
		}
		bala2.position.x-= 1-acel; //le agrega un efecto de movimiento a las balas de derecha a izquierda
		if(bala2.position.x<-1){   //si el objeto llega a pasa por la parte izquierda de la pantalla activa la funcion tocar que borra el objeto y crea uno en la parte derecha con una posición aleatoria en x     
		this.tocar_bala2(bala2);
			puntuacion3 += 1; //cada que el juegador pase una bala este le suma un punto
		this.puntuacion_texto.setText('puntuacion: ' + puntuacion3);
		}
		if(Izquierda.isDown){          //  una función if en caso de que el jugador pulse izqu
			character.scale.setTo(-escal_charac,escal_charac);
			//character.position.x-= 3;       //  El personaje se mueve a la Izquierda
            fondojuego.tilePosition.x +=2; //se mueve el fondo -2 para que contrarreste el +1 que se mueve siempre
			bala.position.x += 0.5+acel*0.5; // se realentiza la velocidad de la bala para que de un efecto de que el personaje está retrocediendo
			bala1.position.x += 0.5;
			bala2.position.x += 0.5;

		}
		if(Derecha.isDown){ //  una función if en caso de que el jugador pulse der
			character.scale.setTo(escal_charac,escal_charac);
			//character.position.x += 3;        // El personaje se mueve a la derecha
            fondojuego.tilePosition.x -=1; // Mueve el fondo
			bala.position.x -= 2;
			bala1.position.x -= 2;
			bala2.position.x -= 2;

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
		this.colisiones (); //correa una función que analiza si existe colisión entre el personaje y los objetos y midifica el ovida

		
	},
	
	colisiones: function(){
		var difx_bala= Math.abs(character.position.x- bala.position.x);
        var dify_bala= Math.abs(character.position.y-bala.position.y);
     if(difx_bala< 25 && dify_bala< 35){this.tocar_bala(bala);         
		vidas -= 1; //disminuye el numero de vidas en caso de que el personaje toque la balaa
		this.vida_texto.setText('vida: ' + vidas);//Actualiza el vida en caso de que los objetos se toquen 
		}
		var difx_bala1= Math.abs(character.position.x- bala1.position.x);
        var dify_bala1= Math.abs(character.position.y-bala1.position.y);
     if(difx_bala1< 25 && dify_bala1< 35){this.tocar_bala1(bala1);         
		vidas -= 1; //disminuye el numero de vidas en caso de que el personaje toque la balaa
		this.vida_texto.setText('vida: ' + vidas);//Actualiza el vida en caso de que los objetos se toquen 
		}
		var difx_bala2= Math.abs(character.position.x- bala2.position.x);
        var dify_bala2= Math.abs(character.position.y-bala2.position.y);
     if(difx_bala2< 25 && dify_bala2< 35){this.tocar_bala2(bala2);         
		vidas -= 1; //disminuye el numero de vidas en caso de que el personaje toque la bala
		this.vida_texto.setText('vida: ' + vidas);//Actualiza el vida en caso de que los objetos se toquen 
		}
         //Considicion de paso al siguiente nivel
        if(puntuacion3>10){
            game.state.start("end");   // en caso de que cumpla con un vida mayor a 15 llega al lvl 2 (CAMBIO DE ESCENARIO)
        }
        if(vidas<0){
            game.state.start("lose");   // si su vida llega a menos de 0 vuelve a pantalla de inicio (CAMBIO DE ESCENARIO)
        }
	},


    //Función que elimina y produce nuevas balas
    tocar_bala: function(objeto){//El parámetro de entrada es una bala cualquiera y retorna una bala en una nueva posición
        objeto.alpha=0;
        x=Math.floor(game.width+Math.random()*400);//Posición aleatoria en x
        y=Math.floor(Math.random()*game.height/1.1+20);  //Posición aleatoria en y
        bala= game.add.image(x,y,"balas"); //agrega una bala en la posición aleatoria
        bala.scale.setTo(escal_bala, escal_bala); // escala el tamaño de la bala
        bala.anchor.setTo(0.5); //Ubica el centro de la bala

        this.vida_texto.setText('vida: ' + vidas);//Actualiza el vida      
    },
	
	    tocar_bala1: function(objeto){//El parámetro de entrada es una bala cualquiera y retorna una bala en una nueva posición
        objeto.alpha=0;
        x=Math.floor(game.width+Math.random()*400);//Posición aleatoria en x
        y=Math.floor(Math.random()*game.height/1.1+20);  //Posición aleatoria en y
        bala1= game.add.image(x,y,"balas"); //agrega una bala en la posición aleatoria
        bala1.scale.setTo(escal_bala, escal_bala); // escala el tamaño de la bala
        bala1.anchor.setTo(0.5); //Ubica el centro de la bala

        this.vida_texto.setText('vida: ' + vidas);//Actualiza el vida      
    },
	
	    tocar_bala2: function(objeto){//El parámetro de entrada es una bala cualquiera y retorna una bala en una nueva posición
        objeto.alpha=0;
        x=Math.floor(game.width+Math.random()*400);//Posición aleatoria en x
        y=Math.floor(Math.random()*game.height/1.1+20);  //Posición aleatoria en y
        bala2= game.add.image(x,y,"balas"); //agrega una bala en la posición aleatoria
        bala2.scale.setTo(escal_bala, escal_bala); // escala el tamaño de la bala
        bala2.anchor.setTo(0.5); //Ubica el centro de la bala

        this.vida_texto.setText('vida: ' + vidas);//Actualiza el vida      
    },
	
	

	
	
}

