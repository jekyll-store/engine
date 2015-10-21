var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../../src/stores/PaymentOptionsStore');

describe('PaymentOptionsStore', function() {
  it('triggers options', function() {
    var input = { currency: 'GBP', hook: 'www.payments.io/' };
    s.trigger = sinon.spy();
    s.onSetPaymentOptions(input);
    assert.deepEqual(s.trigger.args[0][0], { paymentOptions: I(input) });
  });
});
