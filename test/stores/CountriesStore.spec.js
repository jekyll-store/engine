var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');

var CountriesStore = require('../../src/stores/CountriesStore');

describe('CountriesStore', function() {
  sinon.spy(CountriesStore, 'trigger');
  function result() { return CountriesStore.trigger.lastCall.args[0]; }

  var input = [
    { iso: 'KH', name: 'Cambodia', zones: ['International', 'Asia']  },
    { iso: 'AT', name: 'Austria', zones: ['International', 'Europe'] },
    { iso: 'GU', name: 'Guam', zones: ['International', 'Oceanian'] }
  ];

  var expected = I.Map({
    'KH': I.Map({
      iso: 'KH',
      name: 'Cambodia',
      zones: I.Set(['International', 'Asia'])
    }),

    'AT': I.Map({
      iso: 'AT',
      name: 'Austria',
      zones: I.Set(['International', 'Europe'])
    }),

    'GU': I.Map({
      iso: 'GU',
      name: 'Guam',
      zones: I.Set(['International', 'Oceanian'])
    })
  });

  it('initially returns empty', function() {
    assert(CountriesStore.getInitialState().countries.equals(I.Map()));
  });

  it('parses countries', function() {
    CountriesStore.onLoadCountries({ countries: input });
    assert(result().countries.equals(expected));
  });

  it('returns countries as inital state after load', function() {
    assert(CountriesStore.getInitialState().countries.equals(expected));
  });
});
