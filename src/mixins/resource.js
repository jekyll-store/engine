//Includes
var I = require('seamless-immutable');
var m = require('../Utils').mapping;

function resource(resName) {
  var mixin = {
    // Public
    listenables: [require('../Actions')],
    getInitialState: function() { return m(resName, this[resName]); },

    // Protected
    toLookUp: function(primaryKey, args) {
      var lookUp = {};

      for(var i = 0; i < args[resName].length; i++) {
        var el = args[resName][i];
        lookUp[el[primaryKey]] = el;
      }

      this[resName] = I(lookUp);
      this.trigger(m(resName, this[resName]));
    }
  };

  mixin[resName] = I({});
  return mixin;
}

module.exports = resource;
