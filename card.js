var Card = (function () {  
  return {
    create : function (pc) {
      var card = AcquiredThing.create(pc, 'card');
      card.animations.add('front', [0]);
      card.animations.add('back', [1]);
    }
  };
})();
