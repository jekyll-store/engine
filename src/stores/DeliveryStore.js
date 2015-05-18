// Includes
var Reflux = require('reflux');
var I = require('seamless-immutable');
var listenAndMix = require('../mixins/listenAndMix');
var adjustOrder = require('../services/adjustOrder');
var first = require('../Utils').first;
var Actions = require('../Actions');

var DeliveryStore = Reflux.createStore({
  // Public
  mixins: [
    listenAndMix(require('./DeliveryMethodsStore'), 'update'),
    listenAndMix(Actions.setDelivery, 'update')
  ],
  Errors: {
    UNDELIVERABLE: 'Unfortunately, we can not deliver to this address.',
    NOT_APPLICABLE: 'Delivery service is not available for your order.'
  },
  getInitialState: function() { return { delivery: t.delivery }; },
  adjust: function(order) {
    var method = t.methods[t.delivery] || first(t.methods);
    if(!method) { return t.orderWithError(order, t.Errors.UNDELIVERABLE); }

    var amount = method.calculator(order);
    t.delivery = I({ name: method.name, amount: amount });
    t.trigger({ delivery: t.delivery });

    return amount ?
      adjustOrder(order, method.name, amount).merge({ delivery: method.name }) :
      t.orderWithError(order, t.Errors.NOT_APPLICABLE);
  },

  // Private
  update: function() { Actions.refreshCheckout(); },
  orderWithError: function(order, error) {
    return order.merge({ errors: order.errors.concat(error) });
  }
});

var t = module.exports = DeliveryStore;
