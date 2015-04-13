var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');
var Totals = require('../../src/services/Totals');

describe('Totals', function() {
  it('calculates totals for empty baskets', function() {
    var expected = I.Map({ price: B(0), weight: B(0) });
    assert(Totals.accumulate(I.Map()).equals(expected));
  });

  it('calculates totals for filled basket', function() {
    var basket = I.fromJS({
      'ball': { name: 'ball', price: B(2.14), weight: B(245), quantity: 1 },
      'bat': { name: 'bat', price: B(1.23), weight: B(367), quantity: 2 }
    });

    var expected = I.Map({ price: B(4.6), weight: B(979) });
    assert(Totals.accumulate(basket).equals(expected));
  });

  it('it ignores missing values', function() {
    var basket = I.fromJS({
      'ball': { name: 'ball', price: B(2.14), quantity: 1 },
      'bat': { name: 'bat', price: B(1.23), quantity: 2 }
    });

    var expected = I.Map({ price: B(4.6), weight: B(0) });
    assert(Totals.accumulate(basket).equals(expected));
  });
});
