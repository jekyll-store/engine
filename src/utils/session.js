// Includes
var Walker = require('./Walker');

var session = {
  // Public
  set: function(k, v) {
    if(t.safe) {
      var serialized = JSON.stringify(Walker.fromBig(v));
      sessionStorage.setItem(k, serialized);
    }
  },
  get: function(k) {
    if(t.safe) {
      var value = sessionStorage.getItem(k);
      return Walker.toBig(JSON.parse(value));
    }
  },

  // Private
  safe: typeof(sessionStorage) !== "undefined"
};

var t = module.exports = session;
