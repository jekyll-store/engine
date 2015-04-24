var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');
var rewire = require('rewire');

var BasketStore = rewire('../../src/stores/BasketStore');

describe('BasketStore', function() {
  sinon.spy(BasketStore, 'trigger');
  function result() { return BasketStore.trigger.lastCall.args[0]; }

  var session = BasketStore.session = { set: sinon.spy() };
  function saved() { return session.set.lastCall.args[1]; }

  BasketStore.products = I.fromJS({
    'shoes': { name: 'shoes', price: B(4.32) },
    'socks': { name: 'socks', price: B(1.23) }
  });

  BasketStore.basket = I.fromJS({
    'bag': { name: 'bag', price: B(2.45), quantity: B(2) }
  });

  it('sets items already in basket', function() {
    BasketStore.onSetItem({ name: 'bag', quantity: 5 });

    var expected = I.fromJS({
      'bag': { name: 'bag', price: B(2.45), quantity: B(5) }
    });

    assert(result().basket.equals(expected));
    assert.deepEqual(saved(), expected.toJS());
  });

  it('sets items from products', function() {
    BasketStore.onSetItem({ name: 'shoes', quantity: 1 });

    var expected = I.fromJS({
      'bag': { name: 'bag', price: B(2.45), quantity: B(5) },
      'shoes': { name: 'shoes', price: B(4.32), quantity: B(1) },
    });

    assert(result().basket.equals(expected));
    assert.deepEqual(saved(), expected.toJS());
  });

  it('removes items', function() {
    BasketStore.onRemoveItem({ name: 'bag' });

    var expected = I.fromJS({
      'shoes': { name: 'shoes', price: B(4.32), quantity: B(1) }
    });

    assert(result().basket.equals(expected));
    assert.deepEqual(saved(), expected.toJS());
  });

  it('clears items', function() {
    BasketStore.onCompleted();
    assert.deepEqual(saved(), {});
  });
});
