// Includes
var I = require('seamless-immutable');
var m = require('../Utils').mapping;

function keptInStorage(key, defaultValue) {
  return {
    // Public
    init: function() { this[key] = I(this.session.get(key) || defaultValue); },
    getInitialState: function() { return m(key, this[key]); },

    // Private
    session: require('../Utils').Session,
    update: function() {
      this.session.set(key, this[key]);
      this.trigger(m(key, this[key]));
    }
  };
}

module.exports = keptInStorage;
