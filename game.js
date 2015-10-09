var game = new Phaser.Game(600, 400, Phaser.AUTO, 'game');
game.state.add('street', streetLevel);
game.state.start('street'); 
