var Facade = (function () {

  return {
    create : function () {
      // var facade = game.add.tilemap('facade', 80, 56, 4800, 1120);
      // facade.addTilesetImage('environment');
      // facade.street = facade.createLayer('layer');
      // facade.street.resizeWorld();
      facade = game.add.sprite(0,game.height, 'facade');
      zOrder.putInLayer(facade, 'FACADE');
      
      return facade;
    }
  };

})();
