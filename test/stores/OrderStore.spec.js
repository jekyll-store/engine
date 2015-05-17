var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../../src/stores/OrderStore');

describe('OrderStore', function() {
  var tokenizer = sinon.stub().callsArgWith(2, null, 'FHRFDG4523DF3');
  var success = { body: { number: '28475EUF839' } };
  var post = sinon.stub().returnsThis();
  var send = sinon.stub().returnsThis();
  var end = sinon.stub().callsArgWith(0, null, success);

  var form = {
    customer: { name: 'Jimmy Chu', email: 'jjc@example.com' },
    address: {
      address1: '45 Avenbury Rd',
      city: 'Rochester',
      county: 'Kent',
      country: 'GB',
      postcode: 'RO34 8GU'
    },
    card: {
      number: '4111111111111111',
      name: 'MR J Chu',
      month: '02',
      year: '2018',
      cvc: '764'
    }
  };

  before(function() {
    s.trigger = sinon.spy();
    s.completed = sinon.spy();
    s.basket = I({ 'bag': { name: 'bag', quantity: 1, price: 5.30, weight: 1500 } });
    s.paymentOptions = I({ hook: 'www.server.io/', tokenizer: tokenizer, currency: 'GBP' });
    s.request = { post: post, send: send, end: end };

    s.order = I({
      totals: { price: 5.30, weight: 1500, order: 7.80 },
      delivery: 'Second Class',
      errors: [],
      adjustments: [{ label: 'Second Class', amount: 2.50 }]
    });
  });

  it('processes a successful purchase correctly', function() {
    var expectedJSON = {
      basket: { 'bag': 1 },
      customer: form.customer,
      address: form.address,
      delivery: 'Second Class',
      token: 'FHRFDG4523DF3',
      currency: 'GBP',
      total: 7.8
    };

    s.onPurchase(form);
    assert(tokenizer.calledWithMatch(I(form.card), 780));
    assert(post.calledWith('www.server.io/'));
    assert.deepEqual(send.args[0][0], expectedJSON);
    assert(s.completed.calledWith(success.body));
  });

  it('forwards purchase errors', function() {
    end.callsArgWith(0, { response: { body: { message: 'Internal server error.' } } });
    s.onPurchase(form);
    var expected = s.order.merge({ errors: ['Internal server error.'] });
    assert.deepEqual(s.trigger.args[0][0], { order: expected });
  });

  it('forwards tokenizer errors', function() {
    tokenizer.callsArgWith(2, 'Invalid Public Key');
    s.onPurchase(form);
    var expected = s.order.merge({ errors: ['Invalid Public Key'] });
    assert.deepEqual(s.trigger.args[1][0], { order: expected });
  });

  it('does not process order with errors', function() {
    tokenizer.reset();
    s.order = s.order.merge({ errors: ['Order is too big!'] });
    s.onPurchase(form);
    assert(tokenizer.notCalled);
  });
});
