var assert = require('chai').assert;
var sinon = require('sinon');
var B = require('big.js');
var Walker = require('../../src/utils/Walker');

describe('Walker', function() {
  it('toBig replaces numbers with Big', function() {
    var data = [
      { age: 34, sku: '233ZD', widths: [23, 56, 67] },
      [ 'Small', 34.7, { article: ['heloo', 99, 0.29] }],
      20.5
    ];

    var expected = [
      { age: B(34), sku: '233ZD', widths: [B(23), B(56), B(67)] },
      [ 'Small', B(34.7), { article: ['heloo', B(99), B(0.29)] }],
      B(20.5)
    ];

    assert.equal(JSON.stringify(Walker.toBig(data)), JSON.stringify(expected));
  });

  it('fromBig replaces Big with numbers', function() {
    var data = [
      { age: B(34), sku: '233ZD', widths: [B(23), B(56), B(67)] },
      [ 'Small', B(34.7), { article: ['heloo', B(99), B(0.29)] }],
      B(20.5)
    ];

    var expected = [
      { age: 34, sku: '233ZD', widths: [23, 56, 67] },
      [ 'Small', 34.7, { article: ['heloo', 99, 0.29] }],
      20.5
    ];

    assert.deepEqual(Walker.fromBig(data), expected);
  });
});
