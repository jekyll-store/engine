var assert = require('chai').assert;
var sinon = require('sinon');
var Reflux = require('reflux');
var listenAndMix = require('../../src/mixins/listenAndMix');

describe('listenAndMix', function() {
  describe('listening to action', function() {
    var myAction = Reflux.createAction();
    var callback = sinon.stub();
    var myStore;

    it('does nothing initially', function() {
      myStore = Reflux.createStore({
        mixins: [listenAndMix(myAction, 'callback')],
        callback: callback
      });
      assert(callback.notCalled);
    });

    it('mixes triggered state and calls callback', function() {
      myAction.trigger({ name: 'Harry' });
      assert.equal(myStore.name, 'Harry');
      assert(callback.called);
    });
  });

  describe('listening to store', function() {
    var myStore = Reflux.createStore({
      getInitialState: function(){ return { name: 'Peter' }; }
    });
    var callback = sinon.stub();
    var myAggregateStore;

    it('mixes initial state and does not call callback', function() {
      myAggregateStore = Reflux.createStore({
        mixins: [listenAndMix(myStore, 'callback')],
        callback: callback
      });
      assert.equal(myAggregateStore.name, 'Peter');
      assert(callback.notCalled);
    });

    it('mixes triggered state and calls callback', function() {
      myStore.trigger({ name: 'George' });
      assert.equal(myAggregateStore.name, 'George');
      assert(callback.called);
    });
  });
});
