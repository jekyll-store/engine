var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var Reflux = require('reflux');

var keptInStorage = require('../../src/mixins/keptInStorage');

describe('keptInStorage', function() {
  var AssasinsStore = Reflux.createStore({
    mixins: [keptInStorage('assasins', I.List)]
  });

  sinon.spy(AssasinsStore, 'trigger');
  function result() { return AssasinsStore.trigger.lastCall.args[0]; }

  var session = AssasinsStore.session = { set: sinon.spy() };
  function saved() { return session.set.lastCall.args[1]; }

  it('is empty initially if not in session', function() {
    assert(AssasinsStore.getInitialState().assasins.equals(I.List()));
  });

  it('retreives initial from session if in session', function() {
    var savedAssasins = [
      { name: 'Dave', weapon: 'knife' },
      { name: 'Terry', weapon: 'candlestick' },
    ];
    session.get = function() { return savedAssasins; };
    var expected = I.fromJS(savedAssasins);
    AssasinsStore.init();
    assert(AssasinsStore.getInitialState().assasins.equals(expected));
  });

  it('updates', function() {
    AssasinsStore.assasins = I.fromJS([{ name: 'George', weapon: 'surprise' }]);
    AssasinsStore.update();
    assert(result().assasins.equals(AssasinsStore.assasins));
    assert.deepEqual(saved(), AssasinsStore.assasins.toJS());
  });
});
