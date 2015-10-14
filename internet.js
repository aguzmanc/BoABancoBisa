var Internet = (function () {
  var Instance = (function () {
    return {
      done : function () {
        var ticket = Ticket.create(this.pc);

        game.camera.tween = game.add.tween(game.camera)
          .to({x: this.level.pc.x - game.width/2},
              750, Phaser.Easing.Quadratic.InOut, true);

        game.camera.followPc = true;
        Local.Instance.done.call(this);

        return ticket;
      },

      beUsed : function () {
        game.camera.unfollow();
        game.camera.followPc = false;
        game.camera.tween = game.add.tween(game.camera)
          .to({x: this.door.x - game.width/2 + Screen.getWidth()},
              750, Phaser.Easing.Quadratic.InOut, true);
        this.screen = Screen.create(this.level, this.done, this);
        Local.Instance.beUsed.call(this);
      },

      canBeUsed : function () {
        return this.pc.acquiredThing &&
          this.pc.acquiredThing.key === 'card';
      }
    };
  })();

  return {
    create : function (x, lvl) {
      var internet = Local.create(config.street.internet, {x: 191},
                                  lvl, 'internet');
      internet.level = lvl;
      util.assignAllFunctions(internet, Instance);

      return internet;
    }
  };
})();
