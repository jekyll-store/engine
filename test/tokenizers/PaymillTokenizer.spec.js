var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var PaymillTokenizer = require('../../src/tokenizers/PaymillTokenizer');

describe('PaymillTokenizer', function() {
  var callback = sinon.spy(),
      paymill  = {},
      tokenizer;

  var card = I({
    number: '4111111111111111',
    month: '02',
    year: '2022',
    cvc: '123'
  });

  before(function() {
    tokenizer = PaymillTokenizer({
      publicKey: 'jghktghvtvt',
      currency: 'GBP',
      paymill: paymill
    });
  });

  it('creates token', function() {
    paymill.createToken = function(card, cb) {
      cb(null, {
        "token": "098f6bcd4621d373cade4e832627b4f6",
        "bin": "427346",
        "binCountry": "DE",
        "brand": "VISA",
        "last4Digits": "1111",
        "ip": "82.135.34.186",
        "ipCountry": "de"
      });
    };

    tokenizer(card, '1520', callback);
    assert.equal(callback.args[0][1], '098f6bcd4621d373cade4e832627b4f6');
  });

  it('handles errors', function() {
    paymill.createToken = function(card, cb) {
      cb({ "apierror": "internal_server_error" });
    };

    tokenizer(card, '1520', callback);
    assert.equal(callback.args[1][0], 'Communication with PSP failed');
  });
});