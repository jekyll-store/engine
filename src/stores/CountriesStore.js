// Includes
var Reflux = require('reflux');
var resource = require('../mixins/resource');

var CountriesStore = Reflux.createStore({
  // Public
  mixins: [resource('countries')],
  onLoadCountries: function(args) { this.toLookUp('iso', args); }
});

var t = module.exports = CountriesStore;
