var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');
var rewire = require('rewire');

var OrderStore = rewire('../../src/stores/OrderStore');

describe('OrderStore', function() {
  sinon.spy(OrderStore, 'trigger');
  function result() { return OrderStore.trigger.lastCall.args[0]; }

  OrderStore.basket = I.fromJS({
    'bag': { name: 'bag', quantity: B(1), price: B(5.30), weight: B(1500) }
  });

  before(function() {
    OrderStore.order = I.fromJS({
      totals: { price: B(5.30), weight: B(1500), order: B(7.80) },
      delivery: 'Second Class',
      errors: [],
      adjustments: [{ label: 'Second Class', amount: B(2.50) }]
    });
  });

  var tokenizer = sinon.stub().callsArgWith(2, null, 'FHRFDG4523DF3');
  OrderStore.paymentOptions = I.Map({
    hook: 'https://my-payments-server.com/',
    tokenizer: tokenizer,
    currency: 'GBP'
  });

  var post = sinon.stub().returnsThis();
  var send = sinon.stub().returnsThis();
  var end = sinon.stub().callsArgWith(0, null);
  OrderStore.request = { post: post, send: send, end: end };

  var form = {
    customer: {
      name: 'Jimmy Chu',
      email: 'jjc@example.com',
    },
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

  var completed = OrderStore.__get__('Actions').completed = sinon.spy();

  it('processes a successful purchase correctly', function() {
    var expectedJSON = {
      basket: { 'bag': '1' },
      customer: form.customer,
      address: form.address,
      delivery: 'Second Class',
      token: 'FHRFDG4523DF3',
      currency: 'GBP',
      total: '7.8'
    };

    OrderStore.onPurchase(form);
    assert(tokenizer.calledWithMatch(I.Map(form.card), '780'));
    assert(post.calledWith('https://my-payments-server.com/'));
    assert(send.calledWith(expectedJSON));
    assert(completed.called);
  });

  it('forwards purchase errors', function() {
    end.callsArgWith(0, { response: { body: { message: 'Internal server error.' } } });
    OrderStore.onPurchase(form);
    assert(result().order.get('errors').equals(I.List(['Internal server error.'])));
  });

  it('forwards tokenizer errors', function() {
    tokenizer.callsArgWith(2, 'Invalid Public Key');
    OrderStore.onPurchase(form);
    assert(result().order.get('errors').equals(I.List(['Invalid Public Key'])));
  });

  it('does not process order with errors', function() {
    tokenizer.reset();
    OrderStore.order = OrderStore.order.set('errors', I.List(['Order is too big!']));
    OrderStore.onPurchase(form);
    assert(tokenizer.notCalled);
  });
});
