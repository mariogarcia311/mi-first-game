// JavaScript Document
// SE CREAN EL OBJETO PHASER.GAME, SE DEFINE SU TAMAÑO Y SE CREAN LOS ESTADOS DEL JUEGO

var game = new Phaser.Game(720, 480, Phaser.CANVAS, 'juegoM'); // Se crea un nuevo objeto "Phaser.Game" y se define su tamaño

// Se crean los estados del juego
game.state.add('menu', menu); 
game.state.add('lose',lose);
game.state.add('level1', level1);
game.state.add('level2', level2);
game.state.add('level3', level3);
game.state.add('end', end);

game.state.start('menu'); // Inicia en el estado "menu"