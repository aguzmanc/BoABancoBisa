var Background = (function () {
  var Instance = (function () {
    return {
      update : function () {
        this.tilePosition.x = game.camera.x * this.zFactor;
      }
    };
  })();

  return {
    create : function () {
      var mountains = game.add.tileSprite(0,game.height, 8700, 560, 'mountains');
      mountains.zFactor = config.street.parallax.mountains;
      zOrder.putInLayer(mountains, 'MOUNTAINS');

      var town = game.add.tileSprite(0,game.height, 8700, 560, 'town');
      town.zFactor = config.street.parallax.town;
      zOrder.putInLayer(town, 'TOWN');

      town.update = mountains.update = Instance.update;

      return {
        // mountains : mountains,
        town : town
      };
    }
  };
})();

