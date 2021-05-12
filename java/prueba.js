        
        
        //Generación estrellas en Posiciones aleatorias
        x=Math.floor(Math.random()*game.width/1.5+100);//Posición aleatoria en x
        y=Math.floor(Math.random()*game.height/1.5+100); // Posición aleatoria en y
        estrella= game.add.image(x,y,"estrellas"); //agrega una estrella en la posición aleatoria
        estrella.scale.setTo(0.35, 0.35);  // escala el tamaño de la estrella
        estrella.anchor.setTo(0.5) //Ubica el centro de la estrella
		texto = game.add.text(250, 50, "Recoge 10 estrellas", {font: "bold 22px sans-serif", fill:"#00000"});  // Indicación del juego
        this.scoreText = this.add.text(220, 80, 'Cantidad de estrellas: 0', { fontSize: '22px', fill: "#00000" });// Puntajes
        
        
        //Asociación de variables a las acciones de las flechas del teclado
        Abajo = game.input.keyboard.addKey(Phaser.Keyboard.UP);  
		Arriba = game.input.keyboard.addKey(Phaser.Keyboard.DOWN); 
		Derecha = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		Izquierda= game.input.keyboard.addKey(Phaser.Keyboard.LEFT); 

		game.physics.arcade.enable(character);
		character.body.collideWorldBounds = true; //  El pesonaje no puede salir de la pantalla del juego
		},


    
	update:function(){                // ejecuta de manera reiterativa
			character.angle=0;
		if(Izquierda.isDown){          //  si la tecla izquierda está undida...
			character.scale.setTo(0.15,0.15);
			character.position.x-= 3;       //  El personaje se mueve a la Izquierda
            fondojuego.tilePosition.x +=1; //Mueve el fondo
		}
		if(Derecha.isDown){
			character.scale.setTo(-0.15,0.15);
			character.position.x += 3;        // El personaje se mueve a la derecha
            fondojuego.tilePosition.x -=1; // Mueve el fondo
		}	
		if(Arriba.isDown){
			character.scale.setTo(-0.15,0.15);
			character.position.y += 3;        // El personaje se mueve hacia arriba
		}	
        		if(Abajo.isDown){
			character.scale.setTo(-0.15,0.15);
			character.position.y -= 3;        // El personaje se mueve hacia abajo
		}	
		
      //Condición para activar función para desaparecer estrellas
        var posx= Math.abs(character.position.x- estrella.position.x);
        var posy= Math.abs(character.position.y-estrella.position.y);
        if(posx< 20 && posy< 30){
            
            this.eliminar(estrella); 
         }
    
         //Considicion de paso al siguiente nivel
        if(contador>9){
            game.state.start("nivel2");   // Siguiente nivel
        }
	},
 
    
    //Función que elimina y produce nuevas estrellas
    eliminar: function(nstar){//El parámetro de entrada es una estrella cualquiera y retorna una estrella en una nueva posición
        nstar.alpha=0;
        x=Math.floor(Math.random()*game.width/1.5+100);//Posición aleatoria en x
        y=Math.floor(Math.random()*game.height/1.5+100);  //Posición aleatoria en y
        estrella= game.add.image(x,y,"estrellas"); //agrega una estrella en la posición aleatoria
        estrella.scale.setTo(0.35, 0.35); // escala el tamaño de la estrella
        estrella.anchor.setTo(0.5); //Ubica el centro de la estrella
        contador += 1; //aumenta en uno el contador de puntos
        this.scoreText.setText('Cantidad de estrellas: ' + contador);//Actualiza el puntaje      
    }// JavaScript Document