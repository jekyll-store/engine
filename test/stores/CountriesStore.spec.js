var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../../src/stores/CountriesStore');

describe('CountriesStore', function() {
	var input = [{ iso: 'KH' }, { iso: 'AT' }, { iso: 'GU' }];
	var expected = I({ 'KH': input[0], 'AT': input[1], 'GU': input[2] });

	before(function() { s.trigger = sinon.spy(); });

  it('creates lookup', function() {
    s.onLoadCountries({ countries: input });
    assert.deepEqual(s.trigger.args[0][0], { countries: expected });
  });
});
