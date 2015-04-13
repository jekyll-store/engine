var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var rewire = require('rewire');
var DisplayStore = rewire('../../src/stores/DisplayStore');

describe('DisplayStore', function() {
  sinon.spy(DisplayStore, 'trigger');
  function result() { return DisplayStore.trigger.lastCall.args[0]; }

  var reverseFilter = function(display) {
    return display.set('products', display.get('products').reverse());
  };

  var takeFilter = function(display) {
    return display.set('products', display.get('products').take(2));
  };

  var cycleFilter = function(display) {
    var products = display.get('products');
    var cycled = products.shift().push(products.first());
    return display.set('products', cycled);
  };

  cycleFilter.precedence = -1;

  DisplayStore.products = I.fromJS({
    'crossbow': { name: 'crossbow' },
    'dagger': { name: 'dagger' },
    'cannon': { name: 'cannon' },
    'foil': { name: 'foil' }
  });

  it('has no filter initially', function() {
    var expected = I.fromJS({
      products: [
        { name: 'crossbow' },
        { name: 'dagger' },
        { name: 'cannon' },
        { name: 'foil' }
      ]
    });
    assert(DisplayStore.getInitialState().display.equals(expected));
  });

  it('adds filters', function() {
    DisplayStore.onSetDisplayFilter({ name: 'reverse', filter: reverseFilter });
    DisplayStore.onSetDisplayFilter({ name: 'take', filter: takeFilter });

    var expected = I.fromJS({
      products: [{ name: 'foil' }, { name: 'cannon' }]
    });

    assert(result().display.equals(expected));
  });

  it('removes filters', function() {
    DisplayStore.onRemoveDisplayFilter({ name: 'reverse' });

    var expected = I.fromJS({
      products: [{ name: 'crossbow' }, { name: 'dagger' }]
    });

    assert(result().display.equals(expected));
  });

  it('respects precedence', function() {
    DisplayStore.onSetDisplayFilter({ name: 'cycle', filter: cycleFilter });

    var expected = I.fromJS({
      products: [{ name: 'dagger' }, { name: 'cannon' }]
    });

    assert(result().display.equals(expected));
  });

});
