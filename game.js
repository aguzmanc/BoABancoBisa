// var game = new Phaser.Game(1200, 560, Phaser.AUTO, 'game');
var game = new Phaser.Game(800, 560, Phaser.AUTO, 'game');
game.state.add('street', streetLevel);
game.state.start('street'); 
