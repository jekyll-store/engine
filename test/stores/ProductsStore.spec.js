var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../../src/stores/ProductsStore');

describe('ProductsStore', function() {
  var input = [{ name: 'brush' }, { name: 'comb' }];
  var expected = I({ 'brush': input[0], 'comb': input[1] });

  before(function() { s.trigger = sinon.spy(); });

  it('creates lookup', function() {
    s.onLoadProducts({ products: input });
    assert.deepEqual(s.trigger.args[0][0], { products: expected });
  });
});
