var Walker = (function () {
  var dead = [];

  var Instance = (function () {
    return {
      update : function () {
        this.characterUpdate();

        if (this.collidesWithPc) {
          game.physics.arcade.overlap(this.opponent, this,
                                      Walker.Instance.collidePc, null, this);
        }

        if (this.isOutOfSight()) {
          this.die();
        }
      },

      die : function () {
        this.destroy();
        Walker.dead.push(this);
      },

      isOutOfSight : function () {
        return this.x < game.camera.x - 100 ||
          this.x > (game.camera.x + game.width + 100);
      },

      collidePc : function (pc, walker) {
        if (!this.hasTurnedBack) {
          this.turnBack();
          this.hasTurnedBack = true;
        }
      },

      turnBack : function () {
        this.body.velocity.x *= -1;
        this.scale.x *= -1;
      }
    }
  })();

  var Spawner = (function () {
    var Instance = (function () {
      return {
        spawn : function () {
          game.time.events.add(util.getRnd(config.walker.statistics.spawn),
                               this.spawn,
                               this);

          return Walker.create(
            game.rnd.pick(util.objToArray(Walker.spawningSide)),
            game.rnd.pick(config.walker.style),
            this.lvl.pc,
            this.floor ||
              this.lvl.collisionMap[game.rnd.pick(['bottomFloor', 'topFloor'])],
            this.lvl);
        }
      };
    })();

    return {
      create : function (lvl, floor) {
        return spawner = {
          spawn : Instance.spawn,
          lvl : lvl,
          floor : floor
        };
      }
    };
  })();

  return {
    create : function (side, type, pc, floor, lvl) {
      var walker = Character.create(game.camera.x,
                                    floor.findFloor(game.camera.x),
                                    type.key, floor, lvl);

      util.assignAllFunctions(walker, Instance);

      walker.body.velocity.x = type.speed;
      walker.opponent = pc;
      walker.collidesWithPc = (pc.floor === walker.floor);

      if (side === Walker.spawningSide.RIGHT) {
        walker.x += game.camera.width;
        walker.turnBack();
      }

      walker.animations.play('walk');

      return walker;
    },

    spawningSide : {
      RIGHT: 0,
      LEFT: 1
    },

    Instance : Instance,
    Spawner : Spawner,
    dead : dead
  };
})();
