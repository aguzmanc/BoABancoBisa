var util = (function () {
  return {
    objToArray: function (obj) {
      var i,
          arr = [];

      for (i in obj) {
        arr.push(obj[i]);
      }

      return arr;
    },

    getRnd : function (rndThing) {
      return game.rnd.integerInRange(rndThing.min, rndThing.max);
    },

    assignAllFunctions : function (instance, functions) {
      var x,
          prop;

      for (x in functions) {
        prop = functions[x];
        if (typeof(prop) === 'function') {
          instance[x] = prop;
        }
      }

      return instance;
    }
  };
})();
