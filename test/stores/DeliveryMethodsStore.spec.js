var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');
var Calculators = require('../../src/calculators/Calculators');

var DeliveryMethodsStore = require('../../src/stores/DeliveryMethodsStore');

describe('DeliveryMethodsStore', function() {
  sinon.spy(DeliveryMethodsStore, 'trigger');
  function result() { return DeliveryMethodsStore.trigger.lastCall.args[0]; }

  DeliveryMethodsStore.country = I.fromJS({
    name: 'The Crownlands',
    zones: I.Set(['Central', 'West']),
    iso: 'CR'
  });

  it('sets methods and creates calculators', function() {
    var input = {
      methods: [
        {
          name: 'Express',
          zones: ['Central'],
          calculator: 'Percent',
          args: { field: 'total', percent: 25 }
        },
        {
          name: 'Tracked',
          zones: ['South', 'West'],
          calculator: 'Tiered',
          args: {
            field: 'weight',
            tiers: [[0, 3.56], [750, 5.35], [2000]]
          }
        }
      ]
    };

    var expected = {
      methods: I.Map({
        'Express': I.Map({
          name: 'Express',
          zones: I.Set(['Central']),
          calculator: Calculators.Percent({ field: 'total', percent: B(25) })
        }),
        'Tracked': I.Map({
          name: 'Tracked',
          zones: I.Set(['South', 'West']),
          calculator: Calculators.Tiered({
            field: 'weight',
            tiers: [[B(0), B(3.56)], [B(750), B(5.35)], [B(2000)]]
          })
        })
      })
    };

    DeliveryMethodsStore.onLoadDeliveryMethods(input);
    assert(result().methods.toString(), expected.methods.toString());
  });

  it('sets country and only passes on available methods', function() {
    DeliveryMethodsStore.country = I.fromJS({
      name: 'Dorne',
      zones: I.Set(['South']),
      iso: 'DN'
    });

    var expected = {
      methods: I.Map({
        'Tracked': I.Map({
          name: 'Tracked',
          zones: I.Set(['South', 'West']),
          calculator: Calculators.Tiered({
            field: 'weight',
            tiers: [[B(0), B(3.56)], [B(750), B(5.35)], [B(2000)]]
          })
        })
      })
    };

    DeliveryMethodsStore.update();
    assert(result().methods.toString(), expected.methods.toString());
  });

  it('passes on nothing if country not set', function() {
    DeliveryMethodsStore.country = I.Map();
    DeliveryMethodsStore.update();
    assert(result().methods.equals(I.Map()));
  });
});
