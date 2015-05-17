var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var PercentCalculator = require('../../src/calculators/PercentCalculator');

describe('PercentCalculator', function() {
  it('calculates', function() {
    var order = I({ totals: { price: 23.35 } });
    var calc = PercentCalculator({ field: 'price', percent: 25.24 });
    assert.equal(calc(order), 5.89354);
  });
});
