var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../../src/stores/PaymentOptionsStore');

describe('PaymentOptionsStore', function() {
  var input = { tokenizer: 'Paymill', currency: 'GBP', hook: 'www.payments.io/' };
  var expected = I(input).merge({ tokenizer: 'Paymill: GBP' });

  before(function() {
    s.trigger = sinon.spy();
    s.tokenizers.Paymill = function(args) { return 'Paymill: ' + args.currency; };
  });

  it('creates tokenizers', function() {
    s.onSetPaymentOptions(input);
    assert.deepEqual(s.trigger.args[0][0], { paymentOptions: expected });
  });
});
