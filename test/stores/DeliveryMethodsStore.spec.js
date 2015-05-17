var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../../src/stores/DeliveryMethodsStore');

describe('DeliveryMethodsStore', function() {
  var input = [
    { name: 'Express', zones: ['Central'], calculator: 'Percent' },
    { name: 'Tracked', zones: ['South', 'West'], calculator: 'Tiered' }
  ];
  input[0].args = { field: 'total', percent: 25 };
  input[1].args = { field: 'weight', tiers: [[0, 3.56], [750, 5.35], [2000]] };

  var expected = I({
    'Express': { name: 'Express', zones: ['Central'], calculator: 'Percent: 25' },
    'Tracked': { name: 'Tracked', zones: ['South', 'West'], calculator: 'Tiered: 3.56' }
  });

  before(function() {
    s.trigger = sinon.spy();
    s.country = I({ name: 'The Crownlands', zones: ['Central', 'West'] });

    s.calculators = {
      Percent: function(args) { return 'Percent: ' + args.percent },
      Tiered: function(args) { return 'Tiered: ' + args.tiers[0][1] }
    }
  });

  it('sets methods and creates calculators', function() {
    s.onLoadDeliveryMethods({ methods: input });
    assert.deepEqual(s.trigger.lastCall.args[0], { methods: expected });
  });

  it('sets country and only passes on available methods', function() {
    s.country = I({ name: 'Dorne', zones: ['South'] });
    expected = expected.without('Express');
    s.update();
    assert.deepEqual(s.trigger.lastCall.args[0], { methods: expected });
  });

  it('responds correctly to getInitialState after country set', function() {
    assert.deepEqual(s.getInitialState(), { methods: expected });
  });

  it('passes on nothing if country not set', function() {
    s.country = I({});
    s.update();
    assert.deepEqual(s.trigger.lastCall.args[0], { methods: I({}) });
  });
});
