var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var FixedCalculator = require('../../src/calculators/FixedCalculator');

describe('FixedCalculator', function() {
  it('calculates', function() {
    var order = I({ totals: { order: 23.36 } });
    var calc = FixedCalculator({ amount: 4.30 });
    assert.equal(calc(order), 4.30);
  });
});
