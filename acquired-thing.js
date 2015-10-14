var AcquiredThing = (function () {
  var Instance = (function () {
    return {
      update : function () {
        this.x = this.pc.x;
        this.y = this.pc.top - 20;
        this.scale.x += this.spin;

        if (this.scale.x <= 0) {
          if (this.animations.currentAnim.name === 'front') {
            this.animations.play('back');
          } else {
            this.animations.play('front');
          }
        }
        if (this.scale.x <= 0 || this.scale.x >= 1) {
          this.spin *= -1;
        }
      }
    };
  })();

  return {
    create : function (pc, thingKey) {
      if (pc.acquiredThing && !debug) {
        pc.acquiredThing.destroy();
      }
      
      var thing = pc.acquiredThing =
          game.add.sprite(pc.x, pc.top - 20, thingKey);

      thing.animations.add('front', [0]);
      thing.animations.add('back', [0]);

      pc.acquiredThing.anchor.set(.5,1);
      
      pc.acquiredThing.pc = pc;
      pc.acquiredThing.spin = -.05;

      util.assignAllFunctions(pc.acquiredThing, Instance);
      pc.acquiredThing.update = Instance.update;

      zOrder.putInLayer(pc.acquiredThing, 'FLOAT');

      return pc.acquiredThing
    }
  };
})();
