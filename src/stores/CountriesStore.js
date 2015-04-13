// Includes
var Reflux = require('reflux');
var I = require('immutable');

var CountriesStore = Reflux.createStore({
  // Public
  listenables: [require('../Actions')],
  getInitialState: function() { return { countries: I.Map() }; },
  onLoadCountries: function(args) {
    var countries = I.Map();

    args.countries.forEach(function(country) {
      countries = countries.set(country.iso, I.Map({
        iso: country.iso,
        name: country.name,
        zones: I.Set(country.zones)
      }));
    });

    this.trigger({ countries: countries });
  }
});

module.exports = CountriesStore;