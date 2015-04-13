var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var rewire = require('rewire');

var AddressStore = rewire('../../src/stores/AddressStore');

describe('AddressStore', function() {
  sinon.spy(AddressStore, 'trigger');
  function result() { return AddressStore.trigger.lastCall.args[0]; }

  var countries = I.fromJS({
    'KH': { name: 'Cambodia', zones: ['International', 'Asia'], iso: 'KH' },
    'AT': { name: 'Austria', zones: ['International', 'Europe'], iso: 'AT' },
    'GU': { name: 'Guam', zones: ['International', 'Oceanian'], iso: 'GU' }
  });

  it('has empty address initially', function() {
    assert(AddressStore.getInitialState().country.equals(I.Map()));
  });

  it('defaults to first country when countries loaded', function() {
    AddressStore.countries = countries;
    AddressStore.update();
    assert(result().country.equals(countries.get('KH')));
  });

  it('finds country when set', function() {
    AddressStore.country = 'GU';
    AddressStore.update();
    assert(result().country.equals(countries.get('GU')));
  });

  it('uses first country if iso not found', function() {
    AddressStore.country = 'US';
    AddressStore.update();
    assert(result().country.equals(countries.get('KH')));
  });
});
