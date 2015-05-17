var assert = require('chai').assert;
var sinon = require('sinon');
var Actions = require('../src/Actions');

describe('Actions', function() {
  describe('checkKey', function() {
    before(function() { sinon.stub(console, 'warn'); });
    afterEach(function() { console.warn.reset(); });
    after(function() { console.warn.restore(); });

    it('accepts arrays with all keys are present and unique', function() {
      var input = {
        products: [
          { name: 'bag', price: 3.45 },
          { name: 'coat', price: 4.60 },
          { name: 'shoes', price: 2.25 }
        ]
      };
      assert.ok(Actions.loadProducts.shouldEmit(input));
      assert(console.warn.notCalled);
    });

    it('does not accept missing keys', function() {
      var input = {
        products: [
          { name: 'bag', price: 3.45 },
          { price: 4.60 },
          { name: 'shoes', price: 2.25 }
        ]
      };

      assert.notOk(Actions.loadProducts.shouldEmit(input));
      assert(console.warn.called);
    });

    it('does not accept duplicate keys', function() {
      var input = {
        products: [
          { name: 'bag', price: 3.45 },
          { name: 'bag', price: 4.60 },
          { name: 'shoes', price: 2.25 }
        ]
      };

      assert.notOk(Actions.loadProducts.shouldEmit(input));
      assert(console.warn.called);
    });
  });
});
