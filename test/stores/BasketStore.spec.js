var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../../src/stores/BasketStore');

describe('BasketStore', function() {
  before(function() {
    s.trigger = sinon.spy();
    s.session.set = sinon.spy();
    s.products = I({ 'shoes': { name: 'shoes' }, 'socks': { name: 'socks' } });
    s.basket = I({ 'bag': { name: 'bag', quantity: 2 } });
  });

  it('sets items already in basket', function() {
    var expected = I({ 'bag': { name: 'bag', quantity: 5 } });
    s.onSetItem({ name: 'bag', quantity: 5 });
    assert.deepEqual(s.trigger.lastCall.args[0], { basket: expected });
    assert.deepEqual(s.session.set.lastCall.args, ['basket', expected]);
  });

  it('sets items from products', function() {
    var expected = I({
      'bag': { name: 'bag', quantity: 5 },
      'shoes': { name: 'shoes', quantity: 1 },
    });

    s.onSetItem({ name: 'shoes', quantity: 1 });
    assert.deepEqual(s.trigger.lastCall.args[0], { basket: expected });
    assert.deepEqual(s.session.set.lastCall.args, ['basket', expected]);
  });

  it('removes items', function() {
    var expected = I({ 'shoes': { name: 'shoes', quantity: 1 } });
    s.onRemoveItem({ name: 'bag' });
    assert.deepEqual(s.trigger.lastCall.args[0], { basket: expected });
    assert.deepEqual(s.session.set.lastCall.args, ['basket', expected]);
  });

  it('clears items', function() {
    s.onCompleted();
    assert.deepEqual(s.session.set.lastCall.args, ['basket', {}]);
  });
});
