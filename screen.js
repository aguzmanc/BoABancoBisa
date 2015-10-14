var Screen = (function () {
  var Instance = (function () {
    return {
      update : function () {
        if (this.tween && !this.tween.isRunning) {
          // this.destroy();
        }
        if (!this.tween && !this.animations.currentAnim.isPlaying) {
          this.onFinish.call(this.onFinishContext);
          this.tween = game.add.tween(this)
            .to({
              x: this.level.pc.x,
              y: this.level.internet.y,
              alpha: 0
            }, 800, Phaser.Easing.Exponential.In, true);
          game.add.tween(this.scale)
            .to({
              x: 0,
              y: 0
            }, 800, Phaser.Easing.Exponential.In, true);
        }
      },
    };
  })();
  
  var getSpriteModel = function () {
    if (!this.spriteModel) {
      this.spriteModel = game.add.sprite(-100,-100,'screen');
      this.spriteModel.kill();
    }

    return this.spriteModel;
  };

  return {
    create : function (lvl, onFinish, context) {
      var screen = game.add.sprite(lvl.internet.x, lvl.internet.y, 'screen');
      zOrder.putInLayer(screen, 'FLOAT');
      screen.alpha = 0;
      screen.scale.set(0);
      screen.animations.add('register', [0,1,2,3,4,5], debug? 4:1, false);
      screen.animations.play('register');
      screen.anchor.set(1,0);

      screen.onFinish = onFinish;
      screen.onFinishContext = context;
      screen.level = lvl;

      util.assignAllFunctions(screen, Instance);

      game.add.tween(screen)
        .to({
          // x: game.camera.x + game.width - 20 + Screen.getWidth(),
          x: lvl.pc.x + Screen.getWidth() + Screen.getWidth()/2 + 100,
          y: game.camera.y + 20,
          alpha: 1
        }, 800, Phaser.Easing.Exponential.In, true);
      game.add.tween(screen.scale)
        .to({
          x: 1,
          y: 1
        }, 800, Phaser.Easing.Exponential.In, true);

      return screen;
    },

    getWidth : function () {
      return getSpriteModel.call(this).width;
    },

    getHeight : function () {
      return getSpriteModel.call(this).height;
    }
  };
})();
