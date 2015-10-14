var Local = (function () {
  var Instance = (function () {
    return {
      done : function () {
        this.animations.play('off');
        this.pc.stopUsingIt();
      },
      beUsed : function () {
        this.animations.play('on');
      },
      update : function () {
        if (this.pc.canUseIt(this) && this.canBeUsed()
            && this.pc.cursor.isOn(this.pc.cursor.actions.upOrAction)) {
          this.pc.useIt(this);
        }
      },
      canBeUsed : function () {
        return true;
      }
    };
  })();

  return {
    create : function (x, door, lvl, key) {
      var local = game.add.sprite(x, config.street.wall, key);
      door.x += x - local.width/2;
      local.door = door;
      local.animations.add('on', [0]);
      local.animations.add('off', [0]);
      local.animations.play('off');
      local.anchor.set(.5,1);
      local.pc = lvl.pc;

      zOrder.putInLayer(local, 'LOCAL');
      util.assignAllFunctions(local, Instance);

      this.collection.push(local);
      return local;
    },
    collection : [],
    Instance : Instance
  };
})();
