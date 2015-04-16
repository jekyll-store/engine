var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var Tokenizers = require('../../src/tokenizers/Tokenizers');

var PaymentOptionsStore = require('../../src/stores/PaymentOptionsStore');

describe('PaymentOptionsStore', function() {
  sinon.spy(PaymentOptionsStore, 'trigger');
  function result() { return PaymentOptionsStore.trigger.lastCall.args[0]; }

  var input = {
    tokenizer: 'Paymill',
    currency: 'GBP',
    hook: 'https://my-payments-server.com/'
  };

  var expected = {
    paymentOptions: I.Map({
      tokenizer: Tokenizers.Paymill({ currency: 'GBP' }),
      currency: 'GBP',
      hook: 'https://my-payments-server.com/'
    })
  };

  it('initially returns empty', function() {
    assert(PaymentOptionsStore.getInitialState().paymentOptions.equals(I.Map()));
  });

  it('creates tokenizers', function() {
    PaymentOptionsStore.onSetPaymentOptions(input);
    assert.equal(
      result().paymentOptions.toString(),
      expected.paymentOptions.toString()
    );
  });

  it('returns paymentOptions as inital state after load', function() {
    var state = PaymentOptionsStore.getInitialState();
    assert.equal(
      state.paymentOptions.toString(),
      expected.paymentOptions.toString()
    );
  });
});
