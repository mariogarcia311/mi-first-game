var puntuacion=0;
var character;
var Abajo;
var Arriba;
var Derecha;
var Izquierda;
var moneda;
var x;
var y;
var escal_charac=0.8;
var escal_moneda=0.04;
var fondojuego;


// El estado jugando tiene tres métodos básicos: preload, create y update
var menu = {
	preload: function() {        // se cargan todas la imágenes en el preload
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;   // se escala la imagen al reducir el tamaño de la ventana
		game.load.image('fondol1', 'imagenes/fondo.jpg');//la imagen del fondo del juego
		game.load.spritesheet('character', 'imagenes/robot2.png', 69.75, 120, 8); //se sube el png del personaje con una dimensión de 69.75px de ancho, 120px de alto y 8 frames
		game.load.image("botonrojo", "imagenes/boton1.png"); //se carga la imagen del boton de carga
		game.load.image("esquiva", "imagenes/esquiva.jpg"); //se carga la imagen del logo del juego
	},
	create: function() {          
		fondojuego = game.add.tileSprite(0, 0, 626, 305, "fondol1"); //Agrega fondo del nivel
		fondojuego.scale.setTo(1.55); 
		
		
        //se le da la ilusion de movimiento
		character = game.add.sprite(69.9, 220, "character"); //se agrega el objeto character en este caso nuestro personaje
		character.anchor.setTo(0.5); // se ubica el centro en la mitad de la imagen
		character.scale.setTo(escal_charac); //se escala la imagen en un tamaño que se pueda jugar
		move= character.animations.add('move'); //se le agrega la animación al personaje
		character.animations.play('move', 7, true); //se le pone una velocidad de animación en el cual se pueda apresiar un movimiento

		//Se agrega el boton de iniciar el juego en el nivel 1
		var boton_jugar = this.add.button(game.width/3.5,game.height/2,"botonrojo",this.play,this);
		boton_jugar.anchor.setTo(0.5);
		boton_jugar.scale.setTo(0.05);
		var textPlay = game.add.text(game.width/2.8,game.height/2,"Jugar",{fill:"#000000",align:"center"});
		textPlay.anchor.setTo(0.5);
		
		esquiva_balas= game.add.image(game.width/3,game.height/9,"esquiva"); //se agrega una imagen del logo
        esquiva_balas.scale.setTo(0.4);  // escala el tamaño de la imagen

		
	},	

	//ejcutar con boton play, ir al estado del nivel 1
	play : function(){
		game.state.start("level1");//
	},
	
	
}