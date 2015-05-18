var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../../src/stores/BasketStore');

describe('BasketStore', function() {
  var expected;

  before(function() {
    s.trigger = sinon.spy();
    s.session.set = sinon.spy();

    s.products = I({
      'shoes': { name: 'shoes', price: 1.20 },
      'socks': { name: 'socks', price: 2.50 }
    });

    s.basket = I({
      'bag': { name: 'bag', price: 6.10, quantity: 2, subtotal: 12.20 }
    });
  });

  it('sets items already in basket', function() {
    expected = I({ 'bag': { name: 'bag', price: 6.1, quantity: 5, subtotal: 30.50 } });

    s.onSetItem({ name: 'bag', quantity: 5 });
    assert.deepEqual(s.trigger.lastCall.args[0], { basket: expected });
    assert.deepEqual(s.session.set.lastCall.args, ['basket', expected]);
  });

  it('sets items from products', function() {
    expected = expected.merge({
      'shoes': { name: 'shoes', price: 1.20, quantity: 1, subtotal: 1.20 },
    });

    s.onSetItem({ name: 'shoes', quantity: 1 });
    assert.deepEqual(s.trigger.lastCall.args[0], { basket: expected });
    assert.deepEqual(s.session.set.lastCall.args, ['basket', expected]);
  });

  it('removes items', function() {
    expected = expected.without('bag');
    s.onRemoveItem({ name: 'bag' });
    assert.deepEqual(s.trigger.lastCall.args[0], { basket: expected });
    assert.deepEqual(s.session.set.lastCall.args, ['basket', expected]);
  });

  it('clears items', function() {
    s.onCompleted();
    assert.deepEqual(s.session.set.lastCall.args, ['basket', {}]);
  });
});
