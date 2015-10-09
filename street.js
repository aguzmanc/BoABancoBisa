var streetLevel = (function () {
  return {
    preload : function () {
      game.load.spritesheet('atm', 'assets/atm.png',100,140);
      game.load.spritesheet('internet', 'assets/internet.png', 100,140);
      game.load.spritesheet('viajero', 'assets/viajero.png', 40, 60);
      game.load.tilemap('street', 'assets/street.json',
                        null, Phaser.Tilemap.TILED_JSON);
      game.load.image('environment', 'assets/environment.png');
    },

    create : function () {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.arcade.gravity.set(0, config.street.gravity);

      this.street = game.add.tilemap('street', 70, 35, 3000, 350);
      this.street.addTilesetImage('environment');
      this.street.environment = this.street.createLayer('layer');
      this.street.environment.resizeWorld();
      game.physics.arcade.enable(this.street.environment);
      this.street.setCollision([9], true, this.street.environment);

      pc = Traveler.create(this);
      right = Walker.create(Walker.spawningSide.RIGHT,
                             config.walker[0], pc, this);
      left = Walker.create(Walker.spawningSide.LEFT,
                             config.walker[1], pc, this);
    },

    update : function () {
    }
  };
})();
