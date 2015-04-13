// Includes
var Reflux = require('reflux');
var I = require('immutable');
var listenAndMix = require('../mixins/listenAndMix');

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
    return {
      country: t.countries.get(t.country) || t.countries.first() || I.Map()
    };
  }
});

var t = module.exports = AddressStore;