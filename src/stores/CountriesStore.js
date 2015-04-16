// Includes
var Reflux = require('reflux');
var I = require('immutable');

var CountriesStore = Reflux.createStore({
  // Public
  listenables: [require('../Actions')],
  getInitialState: function() { return { countries: t.countries }; },
  onLoadCountries: function(args) {
    t.countries = I.Map();

    args.countries.forEach(function(country) {
      t.countries = t.countries.set(country.iso, I.Map({
        iso: country.iso,
        name: country.name,
        zones: I.Set(country.zones)
      }));
    });

    t.trigger({ countries: t.countries });
  },

  // Private
  countries: I.Map()
});

var t = module.exports = CountriesStore;