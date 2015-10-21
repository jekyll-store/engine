// Includes
var Reflux = require('reflux');
var I = require('seamless-immutable');
var B = require('big.js');
var listenAndMix = require('../mixins/listenAndMix');

var OrderStore = Reflux.createStore({
  // Public
  listenables: [require('../Actions')],
  mixins: [
    listenAndMix(require('./PaymentOptionsStore')),
    listenAndMix(require('./BasketStore')),
    listenAndMix(require('./CheckoutStore'), 'update')
  ],
  getInitialState: function() { return { order: t.order }; },
  onPurchase: function(payload) {
    if(t.order.errors.length > 0) { return; }

    payload = I(payload).merge({
      basket: t.minimalBasket(),
      delivery: t.order.delivery,
      currency: t.paymentOptions.currency,
      total: t.order.totals.order
    });

    t.request
      .post(t.paymentOptions.hook)
      .send(payload)
      .end(function(err, response) {
        if(err) {
          t.onSetErrors({ errors: [t.parseError(err)] });
        } else {
          t.completed(response.body);
        }
      });
  },
  onSetErrors: function(args) {
    var order = t.order.merge({ errors: args.errors });
    if(args.mutate) { t.order = order; }
    t.trigger({ order: order });
  },

  // Private
  update: function() { t.trigger({ order: t.order }); },

  minimalBasket: function() {
    var minBask = {};
    for(var name in t.basket) { minBask[name] = t.basket[name].quantity; }
    return minBask;
  },

  parseError: function(error) {
    return error.response && error.response.body && error.response.body.message;
  }
});

OrderStore.request = require('superagent');
OrderStore.completed = require('../Actions').completed;

var t = module.exports = OrderStore;
