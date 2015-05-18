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
  onPurchase: function(form) {
    if(t.order.errors.length > 0) { return; }
    form = I(form);
    t.paymentOptions.tokenizer(form.card, t.intTotal(), function(error, token) {
      error ? t.updateWithError(error) : t.triggerPurchaseHook(form, token);
    });
  },

  // Private
  update: function() { t.trigger({ order: t.order }); },
  intTotal: function() { return B(t.order.totals.order).times(100).toFixed(); },

  triggerPurchaseHook: function(form, token) {
    t.request
      .post(t.paymentOptions.hook)
      .send(t.payload(form, token))
      .end(function(error, response) {
        error ? t.updateWithError(t.parseError(error)) : t.completed(response.body);
      });
  },

  parseError: function(error) {
    return error.response && error.response.body && error.response.body.message;
  },

  updateWithError: function(error) {
    t.trigger({ order: t.order.merge({ errors: [error] }) });
  },

  payload: function(form, token) {
    return {
      basket: t.minimalBasket(),
      customer: form.customer,
      address: form.address,
      delivery: t.order.delivery,
      token: token,
      currency: t.paymentOptions.currency,
      total: t.order.totals.order
    };
  },

  minimalBasket: function() {
    var minBask = {};
    for(var name in t.basket) { minBask[name] = t.basket[name].quantity; }
    return minBask;
  }
});

OrderStore.request = require('superagent');
OrderStore.completed = require('../Actions').completed;

var t = module.exports = OrderStore;