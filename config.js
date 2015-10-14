/**
 * The statistics object contains data of the random behaviour of
 * each random thing on the game.
 */
var config = {
  street : {
    wall : 6*56 + 561,
    gravity : 2500,
    floor : 7*20 + 560,
    parallax : {
      mountains : .9,
      town : .8
    },
    atm : 1750,
    internet : 4300,
    airport : 7560
  },

  traveler : {
    speed : 180,
    jumpHeight: 180,
    invulnerableTime: 1000
  },

  wait : {
    atm : 3000,
    internet : 10000
  },

  walker : {
    style : [
      {
        key : 'girl',
        speed : 220
      }, {
        key : 'girl',
        speed : 250
      }, {
        key : 'dude',
        speed : 230
      }, {
        key : 'dude',
        speed : 220
      }, {
        key : 'standing',
        speed : 0,
      }],

    statistics: {
      spawn: {
        min: 3500,
        max: 6500
      }
    }
  }

};
