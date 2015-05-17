// Includes
var Reflux = require('reflux');
var I = require('seamless-immutable');
var resource = require('../mixins/resource');

var PaymentOptionsStore = Reflux.createStore({
	// Public
  mixins: [resource('paymentOptions')],
  onSetPaymentOptions: function(args) {
    t.paymentOptions = I({
      hook: args.hook,
      currency: args.currency,
      tokenizer: t.tokenizers[args.tokenizer]({ currency: args.currency })
    });
    t.trigger({ paymentOptions: t.paymentOptions });
  },

  // Private
  tokenizers: require('../tokenizers/Tokenizers')
});

var t = module.exports = PaymentOptionsStore;
