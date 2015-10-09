var Traveler = (function () {
  var Instance = (function () {

    var controlUpdate = function () {
      this.body.velocity.x = 0;
      if (this.cursor.left.isDown) {
        this.body.velocity.x = -this.speed;
        this.scale.x = -1;
      }
      if (this.cursor.right.isDown) {
        this.body.velocity.x = this.speed;
        this.scale.x = 1;
      }
    };

    var animationUpdate = function () {
      if (this.body.velocity.y > 0) {
        this.animations.play('jump-down');
      } else if (this.body.velocity.y < 0) {
        this.animations.play('jump-up');
      } else if (this.body.velocity.x !== 0) {
        this.animations.play('walk');
      } else {
        this.animations.play('stand');
      }
    };

    return {
      update : function () {
        this.characterUpdate();
        controlUpdate.call(this);
        animationUpdate.call(this);
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
          console.log('woop!');
          this.body.velocity.y = -this.jumpSpeed;
        }
      }
    };
  })();

  return {
    create : function (lvl) {
      var sprite = Character.create(300,100, 'viajero', lvl);
      sprite.speed = config.traveler.speed;
      sprite.jumpSpeed = Math.sqrt(2 * config.traveler.jumpHeight *
                                   config.street.gravity);

      sprite.update = Instance.update;
      sprite.takeDamage = Instance.takeDamage;
      sprite.isInvulnerable = Instance.isInvulnerable;

      sprite.cursor = game.input.keyboard.createCursorKeys();
      sprite.cursor.jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      game.camera.follow(sprite, Phaser.Camera.FOLLOW_PLATFORMER);

      // TODO: finish this.
      sprite.cursor.jump.onDown.add(Instance.jump, sprite);

      return sprite;
    }
  };
})();
