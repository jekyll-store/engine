var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../../src/stores/DeliveryStore');
var adjustOrder = require('../../src/services/adjustOrder');

describe('DeliveryStore', function() {
  var delivery, expected;
  var order = I({ totals: { order: 13.28 }, errors: [], adjustments: [] });

  before(function() {
    s.trigger = sinon.spy();
    s.methods = I({
      'Standard': { name: 'Standard', calculator: sinon.stub().returns(1.60) },
      'Express': { name: 'Express', calculator: sinon.stub().returns(3.40) },
      'Limited': { name: 'Limited', calculator: sinon.stub().returns(undefined) }
    });
  });

  it('creates adjustment with first method by default', function() {
    delivery = I({ name: 'Standard', amount: 1.60 });
    expected = adjustOrder(order, 'Standard', 1.60).merge({ delivery: 'Standard' });
    assert.deepEqual(s.adjust(order), expected);
    assert.deepEqual(s.trigger.args[0][0], { delivery: delivery });
  });

  it('creates adjustment with specified method', function() {
    s.delivery = 'Express';
    delivery = I({ name: 'Express', amount: 3.40 });
    expected = adjustOrder(order, 'Express', 3.40).merge({ delivery: 'Express' });
    assert.deepEqual(s.adjust(order), expected);
    assert.deepEqual(s.trigger.args[1][0], { delivery: delivery });
  });

  it('returns previously set delivery with getInitialState', function() {
    assert.deepEqual(s.getInitialState(), { delivery: delivery });
  });

  it('raises error if selected method returns nothing', function() {
    s.delivery = 'Limited';
    delivery = I({ name: 'Limited', amount: undefined });
    expected = order.merge({ errors: [s.Errors.NOT_APPLICABLE] });
    assert.deepEqual(s.adjust(order), expected);
    assert.deepEqual(s.trigger.args[2][0], { delivery: delivery });
  });

  it('raises error if no methods available', function() {
    s.methods = I({});
    expected = order.merge({ errors: [s.Errors.UNDELIVERABLE] });
    assert.deepEqual(s.adjust(order), expected);
  });

  it('adds errors to previous', function() {
    order = order.merge({ errors: ['This item is a fashion disaster'] });

    expected = order.merge({
      errors: ['This item is a fashion disaster', s.Errors.UNDELIVERABLE]
    });

    assert.deepEqual(s.adjust(order), expected);
  });
});
