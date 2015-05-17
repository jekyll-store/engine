var assert = require('chai').assert;
var sinon = require('sinon');
var Reflux = require('reflux');
var resource = require('../../src/mixins/resource');

describe('resource', function() {
  var PixiesStore = Reflux.createStore({
    mixins: [resource('pixies')],
    onLoadPixies: function(args) { this.toLookUp('name', args); }
  });

  var input = {
    pixies: [{ name: 'Aisling', age: 5 }, { name: 'Vogelein', age: 7 }]
  };

  var expected = {
    pixies: {
      'Aisling': { name: 'Aisling', age: 5 },
      'Vogelein': { name: 'Vogelein', age: 7 }
    }
  };

  it('initially returns empty', function() {
    assert.deepEqual(PixiesStore.getInitialState().pixies, {});
  });

  it('creates lookup', function() {
    sinon.spy(PixiesStore, 'trigger');
    PixiesStore.onLoadPixies(input);
    assert(PixiesStore.trigger.calledWith(expected));
  });

  it('returns pixies as inital state after load', function() {
    assert.deepEqual(PixiesStore.getInitialState(), expected);
  });
});
