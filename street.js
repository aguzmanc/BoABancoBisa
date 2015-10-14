var debug = false;
var streetLevel = (function () {
  
  var bringToTop = function (sprite) {
    sprite.bringToTop();
  };

  return {
    preload : function () {
      game.load.spritesheet('atm', 'assets/retail/banco-union.png',369,225);
      game.load.spritesheet('internet', 'assets/retail/internet.png', 284,284);
      game.load.spritesheet('viajero', 'assets/retail/viajero.png', 80, 120);
      game.load.spritesheet('card', 'assets/retail/tarjeta.png', 187, 121);
      game.load.spritesheet('ticket', 'assets/aux/ticket.png', 32, 37);
      game.load.spritesheet('screen', 'assets/aux/screen.png', 350,300);
      game.load.spritesheet('airport', 'assets/retail/aeropuerto.png', 789,322);
      game.load.spritesheet('airplane', 'assets/aux/airplane.png', 589, 388);
      game.load.spritesheet('enter', 'assets/aux/enter.png', 23, 32);
      game.load.spritesheet('girl', 'assets/retail/peaton1.png', 80, 118);
      game.load.spritesheet('dude', 'assets/retail/peaton2.png', 78, 118);
      game.load.spritesheet('standing', 'assets/retail/peaton3.png', 78, 118);

      game.load.image('town', 'assets/retail/ciudad-de-fondo.png');
      game.load.image('mountains', 'assets/retail/cerros.png');
      game.load.image('facade', 'assets/retail/facade.png');

      game.load.tilemap('collisionMap', 'assets/aux/collision-map.json',
                        null, Phaser.Tilemap.TILED_JSON);
      game.load.image('collision-symbols', 'assets/aux/collision-symbols.png');
    },

    create : function () {
      this.parallaxBackground = Background.create();
      game.stage.backgroundColor = "#1a638e";

      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.physics.arcade.gravity.set(0, config.street.gravity);

      this.collisionMap = CollisionMap.create();
      this.facade = Facade.create();
      this.depthZSorting = game.add.group();

      this.pc = Traveler.create(this);

      this.walkerSpawner = [
        Walker.Spawner.create(this,
                              this.collisionMap.topFloor),
        Walker.Spawner.create(this,
                              this.collisionMap.bottomFloor)];
      this.walkerSpawner[0].spawn();
      this.walkerSpawner[1].spawn();

      this.atm = Atm.create(config.street.atm, this);
      this.internet = Internet.create(3000, this);
      this.airport = Airport.create(4000, this);

      if (debug) {
        this.pc.x = config.street.internet;
        this.pc.acquiredThing = {key: 'card'};
      }

      game.world.resize(8500, 560);
    },

    update : function () {
      zOrder.sort();
    },

    render : function () {
      // game.debug.body(pc);
      // game.debug.body(right);
      // game.debug.body(left);
    }
  };
})();
