var Ticket = (function () {
  return {
    create : function (pc) {
      return AcquiredThing.create(pc, 'ticket');
    }
  };
})();
