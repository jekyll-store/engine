var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var B = require('big.js');

var SortFilter = require('../../src/filters/SortFilter');

describe('SortFilter', function() {
  var display = I.fromJS({
    products: [{ age: B(13) }, { age: B(10) }, { age: B(39) }]
  });

  it('sorts ascending', function() {
    var filter = SortFilter('age', SortFilter.ASC);

    var expected = I.fromJS({
      products: [{ age: B(10) }, { age: B(13) }, { age: B(39) }]
    });

    assert(filter(display).equals(expected));
  });

  it('sorts descending', function() {
    var filter = SortFilter('age', SortFilter.DESC);

    var expected = I.fromJS({
      products: [{ age: B(39) }, { age: B(13) }, { age: B(10) }]
    });

    assert(filter(display).equals(expected));
  });
});
