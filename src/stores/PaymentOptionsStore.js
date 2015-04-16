// Includes
var Reflux = require('reflux');
var I = require('immutable');
var Tokenizers = require('../tokenizers/Tokenizers');

var PaymentOptionsStore = Reflux.createStore({
  // Public
  listenables: [require('../Actions')],
  getInitialState: function() { return { paymentOptions: t.paymentOptions }; },
  onSetPaymentOptions: function(args) {
    t.paymentOptions = I.Map({
      tokenizer: Tokenizers[args.tokenizer]({ currency: args.currency }),
      currency: args.currency,
      hook: args.hook
    });

    t.trigger({ paymentOptions: t.paymentOptions });
  },

  // Private
  paymentOptions: I.Map()
});

var t = module.exports = PaymentOptionsStore;