var Atm = (function () {
  var Instance = (function () {
    return {
      done : function () {
        var card = Card.create(this.pc);
        Local.Instance.done.call(this);

        return card;
      },

      beUsed : function () {
        Local.Instance.beUsed.call(this);
        game.time.events.add(config.wait.atm, this.done, this);
      },

      canBeUsed : function () {
        return !this.pc.acquiredThing;
      }
    };
  })();

  return {
    create : function (x, lvl) {
      var atm = Local.create(x, {x: 300},lvl, 'atm');
      util.assignAllFunctions(atm, Instance);

      return atm;
    }
  };
})();
