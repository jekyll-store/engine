var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../../src/stores/AddressStore');

describe('AddressStore', function() {
  var countries = I({
    'KH': { name: 'Cambodia', zones: ['International', 'Asia'], iso: 'KH' },
    'AT': { name: 'Austria', zones: ['International', 'Europe'], iso: 'AT' },
    'GU': { name: 'Guam', zones: ['International', 'Oceanian'], iso: 'GU' }
  });

  before(function() { s.trigger = sinon.spy(); });

  it('has empty address initially', function() {
    assert.deepEqual(s.getInitialState(), { country: {} });
  });

  it('defaults to first country when countries loaded', function() {
    s.countries = countries;
    s.update();
    assert.deepEqual(s.trigger.lastCall.args[0], { country: countries['KH'] });
  });

  it('finds country when set', function() {
    s.country = 'GU';
    s.update();
    assert.deepEqual(s.trigger.lastCall.args[0], { country: countries['GU'] });
  });

  it('uses first country if iso not found', function() {
    s.country = 'US';
    s.update();
    assert.deepEqual(s.trigger.lastCall.args[0], { country: countries['KH'] });
  });
});
