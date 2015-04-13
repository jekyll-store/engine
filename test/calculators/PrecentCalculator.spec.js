var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');

var PercentCalculator = require('../../src/calculators/PercentCalculator');

describe('PercentCalculator', function() {
  it('calculates', function() {
  	var order = I.fromJS({ totals: { price: B(23.35) } });
    var calc = PercentCalculator({ field: 'price', percent: B(25.24) });
    assert(calc(order).eq(B(5.89354)));
  });
});
