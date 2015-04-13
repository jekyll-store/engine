var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');

var RangesFilter = require('../../src/filters/RangesFilter');

describe('RangesFilter', function() {
  var display = I.fromJS({
    products: [
      { age: B(1.3) },
      { age: B(2.5) },
      { age: B(0.3) },
      { age: B(5.8) },
      { age: B(2.2) }
    ]
  });

  it('filters single range', function() {
    var filter = RangesFilter('age', [[1, 3]]);

    var expected = I.fromJS({
      products: [{ age: B(1.3) }, { age: B(2.5) }, { age: B(2.2) }]
    });

    assert(filter(display).equals(expected));
  });

  it('filters multiple ranges', function() {
    var filter = RangesFilter('age', [[0, 1], [2, 6]]);

    var expected = I.fromJS({
      products: [
        { age: B(2.5) },
        { age: B(0.3) },
        { age: B(5.8) },
        { age: B(2.2) }
      ]
    });

    assert(filter(display).equals(expected));
  });

  it('filters inclusively', function() {
    var filter = RangesFilter('age', [[2.2, 2.5]]);
    var expected = I.fromJS({ products: [{ age: B(2.5) }, { age: B(2.2) }] });
    assert(filter(display).equals(expected));
  });
});
