var CollisionMap = (function () {
  var Layer = (function () {
    var Instance = (function () {
      return {
        findFloor : function (x) {
          var tile,
              y,
              height = this.map.height;
          x = Math.round(x/this.map.tileWidth);

          for (y=0; y<height; y++) {
            tile = this.map.getTile(x,y, this)
            if (tile) {
              return (y-1) * this.map.tileHeight;
            }
          }
          return 200;
        }
      };
    })();
    
    return {
      create : function (map, name) {
        var layer = map.createLayer(name);
        game.physics.arcade.enable(layer);
        map.setCollisionByExclusion([], true, layer);
        layer.resizeWorld();

        layer.findFloor = Instance.findFloor;

        return layer;
      }
    };
  })();
  return {
    create : function () {
      var collisionMap = game.add.tilemap('collisionMap', 80, 14, 8560, 1120);
      collisionMap.addTilesetImage('collision-symbols');

      collisionMap.bottomFloor = Layer.create(collisionMap, 'bottom-floor');
      collisionMap.topFloor = Layer.create(collisionMap, 'top-floor');

      collisionMap.bottomFloor.alpha = collisionMap.topFloor.alpha = 0;

      return collisionMap;
    }
  };

})();
