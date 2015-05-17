// Includes
var Reflux = require('reflux');
var I = require('seamless-immutable');
var listenAndMix = require('../mixins/listenAndMix');
var first = require('../Utils').first;

var AddressStore = Reflux.createStore({
  // Public
  mixins: [
    listenAndMix(require('./CountriesStore'), 'update'),
    listenAndMix(require('../Actions').setAddress, 'update')
  ],
  getInitialState: function() { return t.address(); },

  // Private
  update: function() { t.trigger(t.address()); },
  address: function() {
    return { country: t.countries[t.country] || first(t.countries) || I({}) };
  }
});

var t = module.exports = AddressStore;