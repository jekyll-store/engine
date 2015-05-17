var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var Totals = require('../../src/services/Totals');

describe('Totals', function() {
  it('calculates totals for empty baskets', function() {
    assert.deepEqual(Totals.accumulate(I({})), I({ price: 0, weight: 0 }));
  });

  it('calculates totals for filled basket', function() {
    var basket = I({
      'ball': { name: 'ball', price: 2.14, weight: 245, quantity: 1 },
      'bat': { name: 'bat', price: 1.23, weight: 367, quantity: 2 }
    });
    assert.deepEqual(Totals.accumulate(basket), I({ price: 4.6, weight: 979 }));
  });

  it('it ignores missing values', function() {
    var basket = I({
      'ball': { name: 'ball', price: 2.14, quantity: 1 },
      'bat': { name: 'bat', price: 1.23, quantity: 2 }
    });
    assert.deepEqual(Totals.accumulate(basket), I({ price: 4.6, weight: 0 }));
  });
});
