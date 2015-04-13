var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');
var rewire = require('rewire');

var DeliveryStore = rewire('../../src/stores/DeliveryStore');

describe('DeliveryStore', function() {
  sinon.spy(DeliveryStore, 'trigger');
  function result() { return DeliveryStore.trigger.lastCall.args[0]; }

  before(function() {
    DeliveryStore.methods = I.Map({
      'Standard': I.Map({ name: 'Standard', calculator: sinon.stub().returns(B(1.60)) }),
      'Express': I.Map({ name: 'Express', calculator: sinon.stub().returns(B(3.40)) }),
      'Limited': I.Map({ name: 'Limited', calculator: sinon.stub().returns(undefined) })
    });
  });

  var order = I.fromJS({ totals: { order: B(13.28) }, errors: [], adjustments: [] });

  it('creates adjustment with first method by default', function() {
    var expected = I.fromJS({
      totals: { order: B(14.88) },
      errors: [],
      delivery: 'Standard',
      adjustments: [{ label: 'Standard', amount: B(1.60) }]
    });

    assert(DeliveryStore.adjust(order).equals(expected));
    assert(result().delivery.equals(I.Map({ name: 'Standard', amount: B(1.60) })));
  });

  it('creates adjustment with specified method', function() {
    DeliveryStore.delivery = 'Express';

    var expected = I.fromJS({
      totals: { order: B(16.68) },
      errors: [],
      delivery: 'Express',
      adjustments: [{ label: 'Express', amount: B(3.40) }]
    });

    assert(DeliveryStore.adjust(order).equals(expected));
    assert(result().delivery.equals(I.Map({ name: 'Express', amount: B(3.40) })));
  });

  it('raises error if selected method returns nothing', function() {
    DeliveryStore.delivery = 'Limited';

    var expected = I.fromJS({
      totals: { order: B(13.28) },
      adjustments: [],
      errors: [DeliveryStore.Errors.NOT_APPLICABLE]
    });

    assert(DeliveryStore.adjust(order).equals(expected));
    assert(result().delivery.equals(I.Map({ name: 'Limited', amount: undefined })));
  });

  it('raises error if no methods available', function() {
    DeliveryStore.methods = I.Map();

    var expected = I.fromJS({
      totals: { order: B(13.28) },
      adjustments: [],
      errors: [DeliveryStore.Errors.UNDELIVERABLE]
    });

    assert(DeliveryStore.adjust(order).equals(expected));
  });

  it('adds errors to previous', function() {
    order = order.set('errors', I.fromJS(['This item is a fashion disaster']));

    var expected = I.fromJS({
      totals: { order: B(13.28) },
      adjustments: [],
      errors: [
        'This item is a fashion disaster',
        DeliveryStore.Errors.UNDELIVERABLE
      ]
    });

    assert(DeliveryStore.adjust(order).equals(expected));
  });
});
