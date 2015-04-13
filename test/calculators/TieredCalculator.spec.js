var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');

var TieredCalculator = require('../../src/calculators/TieredCalculator');

describe('TieredCalculator', function() {
  var calc = TieredCalculator({
    field: 'volume',
    tiers: [[B(0), B(3.29)], [B(0.5), B(4.59)], [B(1.2), B(5.39)]]
  });
  var order = I.Map();

  it('calculates', function() {
    order = order.setIn(['totals', 'volume'], B(0.25));
    assert(calc(order).eq(B(3.29)));

    order = order.setIn(['totals', 'volume'], B(0.89));
    assert(calc(order).eq(B(4.59)));

    order = order.setIn(['totals', 'volume'], B(3.25));
    assert(calc(order).eq(B(5.39)));
  });

  it('has inclusive lowerbounds and exclusive upperbounds', function() {
    order = order.setIn(['totals', 'volume'], B(1.2));
    assert(calc(order).eq(B(5.39)));
  });

  it('supports close ended tiers', function() {
    calc = TieredCalculator({
      field: 'volume',
      tiers: [[B(0), B(3.29)], [B(0.5), B(4.59)], [B(1.2)]]
    });

    order = order.setIn(['totals', 'volume'], B(3.25));
    assert.equal(calc(order), undefined);
  });
});
