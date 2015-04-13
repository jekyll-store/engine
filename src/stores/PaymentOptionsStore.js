// Includes
var Reflux = require('reflux');
var I = require('immutable');
var Tokenizers = require('../tokenizers/Tokenizers');

var PaymentOptionsStore = Reflux.createStore({
  // Public
  listenables: [require('../Actions')],
  getInitialState: function() { return { paymentOptions: I.Map() }; },
  onSetPaymentOptions: function(args) {
    this.trigger({
      paymentOptions: I.Map({
        tokenizer: Tokenizers[args.tokenizer]({ currency: args.currency }),
        currency: args.currency,
        hook: args.hook
      })
    });
  }
});

module.exports = PaymentOptionsStore;