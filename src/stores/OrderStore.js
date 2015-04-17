// Includes
var Reflux = require('reflux');
var I = require('immutable');
var listenAndMix = require('../mixins/listenAndMix');
var Actions = require('../Actions');

var OrderStore = Reflux.createStore({
  // Public
  listenables: [Actions],
  mixins: [
    listenAndMix(require('./PaymentOptionsStore')),
    listenAndMix(require('./BasketStore')),
    listenAndMix(require('./CheckoutStore'), 'update')
  ],
  getInitialState: function() { return { order: t.order }; },
  onPurchase: function(form) {
    if(!t.order.get('errors').isEmpty()) { return; }

    form = I.fromJS(form);

    var tokenizer     = t.paymentOptions.get('tokenizer'),
        card          = form.get('card'),
        amountInCents = t.order.getIn(['totals', 'order']).times(100).toFixed();

    tokenizer(card, amountInCents, function(error, token) {
      error ? t.updateWithError(error) : t.triggerPurchaseHook(form, token);
    });
  },

  // Private
  update: function() { t.trigger({ order: t.order }); },

  triggerPurchaseHook: function(form, token) {
    t.request
      .post(t.paymentOptions.get('hook'))
      .send(t.payload(form, token))
      .end(function(error) {
        error ? t.updateWithError(t.parseError(error)) : Actions.completed();
      });
  },

  parseError: function(error) {
    return error.response && error.response.body && error.response.body.message;
  },

  updateWithError: function(error) {
    t.trigger({ order: t.order.set('errors', I.List([error])) });
  },

  payload: function(form, token) {
    return {
      basket: t.minimalBasket().toJSON(),
      customer: form.get('customer').toJSON(),
      address: form.get('address').toJSON(),
      delivery: t.order.get('delivery'),
      token: token,
      currency: t.paymentOptions.get('currency'),
      total: t.order.getIn(['totals', 'order']).toString()
    };
  },

  minimalBasket: function() {
    return t.basket.map(function(item) { return item.get('quantity'); });
  }
});

OrderStore.request = require('superagent');

var t = module.exports = OrderStore;