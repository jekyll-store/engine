var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var adjustOrder = require('../../src/services/adjustOrder');
var s = require('../../src/stores/CheckoutStore');

describe('CheckoutStore', function() {
  var licenseAdjustor = {
    adjust: function(order) { return adjustOrder(order, 'License Fee', 10); }
  };

  var vatAdjustor = {
    adjust: function(order) { return adjustOrder(order, 'VAT', 5.60); }
  };

  var expected = I({
    adjustments: [
      { label: 'License Fee', amount: 10 },
      { label: 'VAT', amount: 5.60 }
    ],
    errors: [],
    totals: { price: 4.6, weight: 979, order: 20.20 }
  });

  before(function() {
    s.trigger = sinon.spy();
    s.adjustors = [licenseAdjustor, vatAdjustor];
    s.basket = I({
      'ball': { name: 'ball', price: 2.14, weight: 245, quantity: 1 },
      'bat': { name: 'bat', price: 1.23, weight: 367, quantity: 2 }
    });
  });

  it('runs basket through checkout', function() {
    s.update();
    assert.deepEqual(s.trigger.args[0][0], { order: expected });
  });
});
