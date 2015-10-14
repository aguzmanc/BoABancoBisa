var Character = (function () {

  var Instance = (function () {
    return {
      update : function () {
        game.physics.arcade.collide(this.floor, this);
      }
    };
  })();
  var addAnimations = function () {
    if (this.key === 'dude') {
      this.animations.add('walk', [0,1], 9, true);
    } else if (this.key === 'standing') {
      this.animations.add('walk', [0,0,0,0,1], 2, true);
    } else {
      this.animations.add('walk', [0,2,1,2], 10, true);
      this.animations.add('stand', [1]);
    }

    if (this.key === 'viajero') {
      this.animations.add('jump-up', [3]);
      this.animations.add('jump-down', [4]);
      this.animations.add('startAction', [5], 8, false);
      this.animations.add('action', [5]);
      this.animations.add('stopAction', [5]);
    }
  };

  return {
    create : function (x,y, key, floor, level) {
      var sprite = game.add.sprite(x,y, key),
          layer = 'BEHIND';
      sprite.level = level;
      sprite.floor = floor;

      if (floor === level.collisionMap.bottomFloor) {
        layer = 'FRONT';
      }
      zOrder.putInLayer(sprite, layer);

      game.physics.arcade.enable(sprite);
      sprite.anchor.set(0.5, 1);
      sprite.body.setSize(sprite.width * 0.5, sprite.height*.9);

      addAnimations.call(sprite);

      sprite.characterUpdate = Character.Instance.update;

      return sprite;
    },

    Instance : Instance
  };
})();
