var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');

var ProductsStore = require('../../src/stores/ProductsStore');

describe('ProductsStore', function() {
  sinon.spy(ProductsStore, 'trigger');
  function result() { return ProductsStore.trigger.lastCall.args[0]; }

  var input = [
    { name: 'brush', price: 4.32, weight: 253 },
    { name: 'comb', price: 1.23, weight: 148 }
  ];

  var expected = I.Map({
    'brush': I.Map({ name: 'brush', price: B(4.32), weight: B(253) }),
    'comb': I.Map({ name: 'comb', price: B(1.23), weight: B(148) })
  });

  it('initially returns empty', function() {
    assert(ProductsStore.getInitialState().products.equals(I.Map()));
  });

  it('parses products', function() {
    ProductsStore.onLoadProducts({ products: input });
    assert(result().products.equals(expected));
  });

  it('returns products as inital state after load', function() {
    assert(ProductsStore.getInitialState().products.equals(expected));
  });
});
