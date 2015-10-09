var Walker = (function () {
  var dead = [];

  var Instance = (function () {
    return {
      update : function () {
        this.characterUpdate();
        game.physics.arcade.overlap(this.opponent, this,
                                    Walker.Instance.collidePc, null, this);        
      },

      isOutOfSight : function () {
        // TODO: kill it when it gets out of the screen!
        // var myRectangle = new Phaser.Rectangle
      },

      collidePc : function (pc, walker) {
        pc.takeDamage();
      }
    }
  })();

  var Spawner = (function () {
    return {
      spawn : function () {
        
      }
    };
  })();

  return {
    create : function (side, type, pc, lvl) {
      var walker = Character.create(game.camera.x, config.street.floor,
                                    type.key, lvl);
      walker.body.velocity.x = type.speed;
      walker.opponent = pc;

      if (side === Walker.spawningSide.RIGHT) {
        walker.x += game.camera.width;
        walker.body.velocity.x *= walker.scale.x = -1;
      }

      walker.update = Instance.update;
      walker.animations.play('walk');

      return walker;
    },

    spawningSide : {
      RIGHT: 0,
      LEFT: 1
    },

    Instance : Instance
  };
})();
