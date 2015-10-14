var Airplane = (function () {
  return {
    create : function (airport) {
      var plane = game.add.sprite(airport.x - 450,
                                  config.street.floor,
                                  'airplane');
      plane.sendToBack();

      plane.level = airport.level;

      game.camera.followPc = false;
      game.camera.unfollow();
      if (!debug) {
        plane.level.pc.acquiredThing.destroy();
      }
      plane.level.pc.destroy();

      // game.add.tween(plane)
      //   .to({
      //     rotation: Math.PI/6,
      //     x: game.camera.x - 20000,
      //     y: game.camera.y - 7000
      //   }, 2000, Phaser.Easing.Exponential.In, true);

      game.camera.tween = game.add.tween(plane)
        .to({y: game.camera.y - 3000,
             rotation: Math.PI/6},
            8000, Phaser.Easing.Quadratic.In, true);      
      game.camera.tween = game.add.tween(plane)
        .to({x: game.camera.x - 6000},
            6000, Phaser.Easing.Linear.In, true);

      game.camera.tween = game.add.tween(game.camera)
        .to({y: game.camera.y - 3000},
            8000, Phaser.Easing.Quadratic.In, true);
      
      game.camera.tween = game.add.tween(game.camera)
        .to({x: game.camera.x - 6500},
            6000, Phaser.Easing.Linear.In, true);

      zOrder.putInLayer(plane, 'PLANE');
      return plane;
    }
  };
})();
