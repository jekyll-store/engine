// Includes
var Reflux = require('reflux');
var I = require('immutable');
var listenAndMix = require('../mixins/listenAndMix');
var adjustOrder = require('../services/adjustOrder');
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
  adjust: function(order) {
    var method = t.methods.get(t.delivery) || t.methods.first();
    if(!method) {  return t.orderWithError(order, t.Errors.UNDELIVERABLE); }

    var name = method.get('name');
    var amount = method.get('calculator')(order);
    t.trigger({ delivery: I.Map({ name: name, amount: amount }) });

    return amount ? adjustOrder(order, name, amount).set('delivery', name) :
                    t.orderWithError(order, t.Errors.NOT_APPLICABLE);
  },

  // Private
  update: function() { Actions.refreshCheckout(); },
  orderWithError: function(order, error) {
    return order.set('errors', order.get('errors').push(error));
  }
});

var t = module.exports = DeliveryStore;
