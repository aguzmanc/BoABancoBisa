var Keyboard = (function () {

  var Instance = (function () {
    return {
      isOn : function (action) {
        var i=0;
        for (i=0; i<action.length; i++) {
          if (this[action[i]].isDown) {
            return true;
          }
        }
        return false;
      }
    };
  })();

  return {
    create : function () {
      var cursor = game.input.keyboard.createCursorKeys();
      cursor.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      cursor.w = game.input.keyboard.addKey(Phaser.Keyboard.W);
      cursor.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
      cursor.s = game.input.keyboard.addKey(Phaser.Keyboard.S);
      cursor.d = game.input.keyboard.addKey(Phaser.Keyboard.D);
      cursor.ctrl = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
      cursor.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

      cursor.actions = {
        upOrAction: ['w', 'up', 'space', 'ctrl', 'enter'],
        left: ['left', 'a'],
        right: ['right', 'd']        
      };

      cursor.isOn = Instance.isOn;

      return cursor;
    }
  };
})();
