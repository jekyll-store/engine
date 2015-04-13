var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');

var FixedCalculator = require('../../src/calculators/FixedCalculator');

describe('FixedCalculator', function() {
  it('calculates', function() {
  	var order = I.fromJS({ totals: { order: B(23.36) } });
    var calc = FixedCalculator({ amount: B(4.30) });
    assert(calc(order).eq(B(4.30)));
  });
});
