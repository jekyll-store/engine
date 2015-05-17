var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var adjustOrder = require('../../src/services/adjustOrder');

describe('adjustOrder', function() {
  it('creates an adjustment and adds to total', function() {
    var order = I({ totals: { order: 34.50 }, adjustments: [] });

    var expected = I({
    	totals: { order: 34.60 },
    	adjustments: [{ label: '10p Tax', amount: 0.10 }]
    });

    assert.deepEqual(adjustOrder(order, '10p Tax', 0.10), expected);
  });
});
