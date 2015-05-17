var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var Reflux = require('reflux');
var keptInStorage = require('../../src/mixins/keptInStorage');

describe('keptInStorage', function() {
  var AssasinsStore = Reflux.createStore({
    mixins: [keptInStorage('assasins', [])]
  });

  it('is empty initially if not in session', function() {
    assert.deepEqual(AssasinsStore.getInitialState(), { assasins: I([]) });
  });

  it('retreives initial from session if in session', function() {
    var assasins = [{ name: 'Dave' }, { name: 'Terry' }];
    AssasinsStore.session.get = function() { return assasins; };

    AssasinsStore.init();

    var expected = { assasins: I(assasins) };
    assert.deepEqual(AssasinsStore.getInitialState(), expected);
  });

  it('updates', function() {
    var trigger = AssasinsStore.trigger = sinon.spy();
    var set = AssasinsStore.session.set = sinon.spy();
    var assasins = AssasinsStore.assasins = I([{ name: 'George' }]);

    AssasinsStore.update();

    assert(trigger.calledWith({ assasins: assasins }));
    assert(set.calledWith('assasins', assasins));
  });
});
