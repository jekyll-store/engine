var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');

var PageFilter = require('../../src/filters/PageFilter');

describe('PageFilter', function() {
  var display = I.fromJS({
    products: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  });

  it('filters full page', function() {
    var filter = PageFilter(3, 1);

    var expected = I.fromJS({
      products: [{ id: 1 }, { id: 2 }, { id: 3 }],
      page: { current: 1, numbers: [1, 2], prev: null, next: 2 }
    });

    assert(filter(display).equals(expected));
  });

  it('filters partial page', function() {
    var filter = PageFilter(3, 2);

    var expected = I.fromJS({
      products: [{ id: 4 }],
      page: { current: 2, numbers: [1, 2], prev: 1, next: null }
    });

    assert(filter(display).equals(expected));
  });

  it('defaults to first pageNum if out of range', function() {
    var filter = PageFilter(3, 5);

    var expected = I.fromJS({
      products: [{ id: 1 }, { id: 2 }, { id: 3 }],
      page: { current: 1, numbers: [1, 2], prev: null, next: 2 }
    });

    assert(filter(display).equals(expected));
  });
});
