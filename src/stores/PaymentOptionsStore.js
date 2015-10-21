// Includes
var Reflux = require('reflux');
var I = require('seamless-immutable');
var resource = require('../mixins/resource');

var PaymentOptionsStore = Reflux.createStore({
	// Public
  mixins: [resource('paymentOptions')],
  onSetPaymentOptions: function(args) {
    t.paymentOptions = I(args);
    t.trigger({ paymentOptions: t.paymentOptions });
  }
});

var t = module.exports = PaymentOptionsStore;
