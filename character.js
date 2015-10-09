var Character = (function () {

  var Instance = (function () {
    return {
      update : function () {
        game.physics.arcade.collide(this.level.street.environment, this);
      }
    };
  })();
  var addAnimations = function () {
    this.animations.add('jump-up', [4]);
    this.animations.add('jump-down', [5]);
    this.animations.add('stand', [3]);
    this.animations.add('walk', [0,1,2,1], 15, true);
  };

  return {
    create : function (x,y, key, level) {
      var sprite = game.add.sprite(x,y, key);
      sprite.level = level;
      game.physics.arcade.enable(sprite);
      sprite.anchor.set(0.5, 1);
      sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.8,
                          0, -sprite.height*.2);

      addAnimations.call(sprite);

      sprite.characterUpdate = Character.Instance.update;

      return sprite;
    },

    Instance : Instance
  };
})();
