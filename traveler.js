var Traveler = (function () {
  var Instance = (function () {

    var useLocal = function () {
      if (Math.abs(this.x - this.using.door.x > 5) ||
          Math.abs(this.y - this.using.y > 5)) {
        game.physics.arcade.moveToXY(this, this.using.door.x,
                                     config.street.wall+1, 100);
      } else {
        this.body.velocity.y = this.body.velocity.x = 0;
      }
    };

    var controlUpdate = function () {
      this.body.velocity.x = 0;

      if (!this.using) {
        if (this.cursor.isOn(this.cursor.actions.left)) {
          this.body.velocity.x = -this.speed;
          this.scale.x = -1;
        }
        if (this.cursor.isOn(this.cursor.actions.right)) {
          this.body.velocity.x = this.speed;
          this.scale.x = 1;
        }
      } else {
        useLocal.call(this);
      }
    };

    var animationUpdate = function () {
      if (this.using) {
        if (this.animations.currentAnim.name === 'startAction' &&
            !this.animations.currentAnim.isPlaying) {
          this.animations.play('action');
        }
      } else {
        if (this.body.velocity.y > 0) {
          this.animations.play('jump-down');
        } else if (this.body.velocity.y < 0) {
          this.animations.play('jump-up');
        } else if (this.body.velocity.x !== 0) {
          this.animations.play('walk');
        } else {
          this.animations.play('stand');
        }
      }
    };

    var updateCamera = function () {
      if (game.camera.followPc &&
          (!game.camera.tween || !game.camera.tween.isRunning)) {
        game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER);
      }
    };

    return {
      update : function () {
        this.characterUpdate();
        controlUpdate.call(this);
        animationUpdate.call(this);
        updateCamera.call(this);

        if (this.canUseALocal()) {
          this.tutorial.alpha = 1;
        } else {
          this.tutorial.alpha = 0;
        }
      },
      isInvulnerable : function () {
        return this.blinkTween && this.blinkTween.isRunning;
      },
      takeDamage : function () {
        if (!this.isInvulnerable()) {
          this.alpha = 0;
          this.blinkTween = game.add.tween(this)
            .to({alpha: 1},
                config.traveler.invulnerableTime/5,
                Phaser.Easing.Bounce.In, true,
                0, 4);

          console.log('ouch!');
        }
      },
      jump : function () {
        if (this.body.blocked.down) {
          this.body.velocity.y = -this.jumpSpeed;
        }
      },
      useIt : function (thing) {
        this.using = thing;
        thing.beUsed(this);
        if (this.body) {
          this.body.allowGravity = false;
          this.animations.play('startAction');
        }
      },
      stopUsingIt : function () {
        this.using = null;
        this.body.allowGravity = true;
        this.animations.play('stopAction');
      },
      canUseIt : function (local) {
        var can = this.y >= local.y && !this.using &&
            Math.abs(local.door.x - this.x) < 125;

        return can;
      },
      canUseALocal : function () {
        var i,
            local;

        for (i=0; i<Local.collection.length; i++) {
          local = Local.collection[i];
          if (this.canUseIt(local) && local.canBeUsed()) {
            return true;
          }
        }
      }
    };
  })();

  return {
    create : function (lvl) {
      var sprite = Character.create(300,config.street.wall, 'viajero',
                                    lvl.collisionMap.bottomFloor, lvl);
      sprite.body.collideWorldBounds = true;
      sprite.speed = config.traveler.speed;
      sprite.jumpSpeed = Math.sqrt(2 * config.traveler.jumpHeight *
                                   config.street.gravity);

      util.assignAllFunctions(sprite, Instance);
      sprite.cursor = Keyboard.create();
      game.camera.followPc = true;      

      for (var i=0; i<sprite.cursor.actions.upOrAction.length; i++) {
        sprite.cursor[sprite.cursor.actions.upOrAction[i]]
          .onDown.add(Instance.jump, sprite);
      }

      var tutorial = sprite.tutorial = game.add.sprite(0,0, 'enter');
      tutorial.animations.add('press', [0,1], 2, true);
      tutorial.animations.play('press');
      tutorial.pc = sprite;
      tutorial.anchor.set(0.5,0);
      zOrder.putInLayer(tutorial, 'FLOAT');

      tutorial.update = function () {
        this.x = this.pc.x;
        this.y = this.pc.y;
      }

      return sprite;
    }
  };
})();
