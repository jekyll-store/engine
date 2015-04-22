// Includes
var Walker = require('./Walker');

var Session = {
  // Public
  set: function(k, v) {
    if(t.safe) {
      var serialized = JSON.stringify(Walker.fromBig(v));
      localStorage.setItem(k, serialized);
    }
  },
  get: function(k) {
    if(t.safe) {
      var value = localStorage.getItem(k);
      return Walker.toBig(JSON.parse(value));
    }
  },

  // Private
  safe: typeof(localStorage) !== "undefined"
};

var t = module.exports = Session;
