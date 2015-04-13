var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');

var SearchFilter = require('../../src/filters/SearchFilter');

describe('SearchFilter', function() {
  var display = I.fromJS({
    products: [{ name: 'Bob' }, { name: 'Ben' }, { name: 'Emma' }]
  });

  it('filters by search word', function() {
    var filter = SearchFilter('name', 'B');
    var expected = I.fromJS({ products: [{ name: 'Bob' }, { name: 'Ben' }] });
    assert(filter(display).equals(expected));
  });

  it('ignores case', function() {
    var filter = SearchFilter('name', 'e');
    var expected = I.fromJS({ products: [{ name: 'Ben' }, { name: 'Emma' }] });
    assert(filter(display).equals(expected));
  });
});
