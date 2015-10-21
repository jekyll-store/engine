var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../../src/stores/OrderStore');

describe('OrderStore', function() {
  var success = { body: { number: '28475EUF839' } };
  var post = sinon.stub().returnsThis();
  var send = sinon.stub().returnsThis();
  var end = sinon.stub().callsArgWith(0, null, success);

  var payload = {
    token: 'FHRFDG4523DF3',
    customer: { name: 'Jimmy Chu' },
    address: { address1: '45 Avenbury Rd' }
  };

  before(function() {
    s.trigger = sinon.spy();
    s.completed = sinon.spy();
    s.basket = I({ 'bag': { name: 'bag', quantity: 1, price: 5.30, weight: 1500 } });
    s.paymentOptions = I({ hook: 'www.server.io/', currency: 'GBP' });
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
      token: payload.token,
      customer: payload.customer,
      address: payload.address,
      basket: { 'bag': 1 },
      delivery: s.order.delivery,
      currency: s.paymentOptions.currency,
      total: s.order.totals.order
    };

    s.onPurchase(payload);
    assert(post.calledWith('www.server.io/'));
    assert.deepEqual(send.args[0][0], expectedJSON);
    assert(s.completed.calledWith(success.body));
  });

  it('forwards purchase errors', function() {
    end.callsArgWith(0, { response: { body: { message: 'Internal server error.' } } });
    s.onPurchase(payload);
    var expected = s.order.merge({ errors: ['Internal server error.'] });
    assert.deepEqual(s.trigger.args[0][0], { order: expected });
  });

  it('does not process order with errors', function() {
    post.reset();
    s.order = s.order.merge({ errors: ['Order is too big!'] });
    s.onPurchase(payload);
    assert(post.notCalled);
  });
});
