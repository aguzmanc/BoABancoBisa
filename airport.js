var Airport = (function () {
  var Instance = (function () {
    return {
      canBeUsed : function () {
        return this.level.pc.acquiredThing &&
          this.level.pc.acquiredThing.key === 'ticket' &&
          this.level.pc.alive;
      },
      beUsed : function () {
        this.level.pc.kill();
        this.level.pc.acquiredThing.kill();
        game.time.events.add(2000, function () {
          Airplane.create(this);
        }, this);
        // Airplane.create(this);
      }
    };
  })();
  
  return {
    create : function (x, lvl) {
      var airport = Local.create(config.street.airport, {x: 380},
                                 lvl, 'airport');
      // var airport = game.add.sprite(config.street.airport,
      //                               config.street.wall, 'airport');
      airport.anchor.set(0.6, 1);
      airport.level = lvl;
      zOrder.putInLayer(airport, 'LOCAL');

      util.assignAllFunctions(airport, Instance);
      return airport;
    }
  };
})();
