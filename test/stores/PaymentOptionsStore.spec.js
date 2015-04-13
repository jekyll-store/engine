var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var Tokenizers = require('../../src/tokenizers/Tokenizers');

var PaymentOptionsStore = require('../../src/stores/PaymentOptionsStore');

describe('PaymentOptionsStore', function() {
  sinon.spy(PaymentOptionsStore, 'trigger');
  function result() { return PaymentOptionsStore.trigger.lastCall.args[0]; }

  it('creates tokenizers', function() {
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

    PaymentOptionsStore.onSetPaymentOptions(input);
    assert(result().toString(), expected.toString());
  });
});
