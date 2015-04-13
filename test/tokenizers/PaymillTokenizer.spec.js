var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var rewire = require('rewire');

var PaymillTokenizer = rewire('../../src/tokenizers/PaymillTokenizer');

describe('PaymillTokenizer', function() {
	var callback = sinon.spy();
  function result() { return callback.lastCall.args; }

  var paymill = {};
  PaymillTokenizer.__set__('paymill', paymill);

	var tokenizer = PaymillTokenizer({ publicKey: 'jghktghvtvt', currency: 'GBP' });

	var card = I.Map({
		number: '4111111111111111',
		month: '02',
		year: '2022',
		cvc: '123'
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
		assert.equal(result()[1], '098f6bcd4621d373cade4e832627b4f6');
	});

	it('handles errors', function() {
		paymill.createToken = function(card, cb) {
			cb({ "apierror": "internal_server_error" });
		};

		tokenizer(card, '1520', callback);
		assert.equal(result()[0], 'Communication with PSP failed');
	});
});