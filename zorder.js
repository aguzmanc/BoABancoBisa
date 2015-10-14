var zOrder = (function () {
  var order = [],
      nLayers = 10,
      i;

  for (i=0; i<nLayers; i++) {
    order.push([]);
  }
  
  return {
    order : order,
    HIDDEN : 0,
    SKY : 1,
    MOUNTAINS : 2,
    TOWN : 3,
    PLANE : 4,
    FACADE : 5,
    LOCAL : 6,
    BEHIND : 7,
    FRONT : 8,
    FLOAT : 9,

    sort : function () {
      var i, j;

      for (i=0; i<order.length; i++) {
        for (j=0; j<order[i].length; j++) {
          order[i][j].bringToTop();
        }
      }
    },

    putInLayer : function (sprite, layerKey) {
      this.order[this[layerKey]].push(sprite);
    }
  };
})();
