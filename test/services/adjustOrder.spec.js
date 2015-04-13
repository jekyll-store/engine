var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');

var adjustOrder = require('../../src/services/adjustOrder');

describe('adjustOrder', function() {
  it('creates an adjustment and adds to total', function() {
    var order = I.fromJS({ totals: { order: B(34.50) }, adjustments: [] });

    var expected = I.fromJS({
      totals: { order: B(34.60) },
      adjustments: [{ label: '10p Tax', amount: B(0.10) }]
    });

    assert(adjustOrder(order, '10p Tax', B(0.10)).equals(expected));
  });
});
