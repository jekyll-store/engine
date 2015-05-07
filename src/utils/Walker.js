var B = require('big.js');

var Walker = {
  walk: function(obj, callback) {
    if(typeof(obj) == 'object' && obj !== null) {
      for(var k in obj) {
        this.walk(obj[k], callback);
        obj[k] = callback(obj[k]) || obj[k];
      }
    }
    return obj;
  },

  toBig: function(obj) {
    return this.walk(obj, function(a) {
      if(typeof(a) == 'number') { return B(a); }
    });
  },

  fromBig: function(obj) {
    return this.walk(obj, function(a) {
      if(a.constructor && a.constructor.name && a.constructor.name == 'Big') {
        return +a;
      }
    });
  }
}

module.exports = Walker;