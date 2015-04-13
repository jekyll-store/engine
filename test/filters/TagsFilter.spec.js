var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');

var TagsFilter = require('../../src/filters/TagsFilter');

describe('TagsFilter', function() {
  var display = I.fromJS({
    products: [
      { id: 1, colour: 'red' },
      { id: 2, colour: 'blue' },
      { id: 3, colour: 'green' },
      { id: 4, colour: 'red' }
    ]
  });

  it('filters single tag', function() {
    var filter = TagsFilter('colour', ['red']);

    var expected = I.fromJS({
      products: [{ id: 1, colour: 'red' }, { id: 4, colour: 'red' }]
    });

    assert(filter(display).equals(expected));
  });

  it('filters multiple tags', function() {
    var filter = TagsFilter('colour', ['red', 'blue']);

    var expected = I.fromJS({
      products: [
        { id: 1, colour: 'red' },
        { id: 2, colour: 'blue' },
        { id: 4, colour: 'red' }
      ]
    });

    assert(filter(display).equals(expected));
  });
});
