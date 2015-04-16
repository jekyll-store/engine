var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');
var rewire = require('rewire');

var CheckoutStore = rewire('../../src/stores/CheckoutStore');
var adjustOrder = require('../../src/services/adjustOrder');

describe('CheckoutStore', function() {
  sinon.spy(CheckoutStore, 'trigger');
  function result() { return CheckoutStore.trigger.lastCall.args[0]; }

  var licenseAdjustor = {
    adjust: function(order) {
      return adjustOrder(order, 'License Fee', B(10));
    }
  };

  var vatAdjustor = {
    adjust: function(order) {
      return adjustOrder(order, 'VAT', B(5.60));
    }
  };

  CheckoutStore.adjustors = [licenseAdjustor, vatAdjustor];

  it('runs basket through checkout', function() {
    CheckoutStore.basket = I.fromJS({
      'ball': { name: 'ball', price: B(2.14), weight: B(245), quantity: B(1) },
      'bat': { name: 'bat', price: B(1.23), weight: B(367), quantity: B(2) }
    });

    var expected = I.fromJS({
      adjustments: [
        { label: 'License Fee', amount: B(10) },
        { label: 'VAT', amount: B(5.60) }
      ],
      errors: [],
      totals: { price: B(4.6), weight: B(979), order: B(20.20) }
    });

    CheckoutStore.update();
    assert(result().order.equals(expected));
  });
});
