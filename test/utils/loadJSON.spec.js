var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var rewire = require('rewire');

var loadJSON = rewire('../../src/utils/loadJSON');

describe('loadJSON', function() {
  var superAgent = {
    get: sinon.stub().returnsThis(),
    set: function() { return this; }
  };
  loadJSON.__set__('SuperAgent', superAgent);

  it('loads JSON from url', function() {
    var callback = sinon.spy();
    var json = [{ name: 'pingu', height: 0.85 }];
    superAgent.end = function(cb) { cb(null, { body: json }); };

    loadJSON('/penguins.json', callback);
    assert(superAgent.get.calledWith('/penguins.json'));
    assert(callback.calledWith(json));
  });

  it('does not propagate failed retrieval', function() {
    var callback = sinon.spy();
    superAgent.end = function(cb) { cb('Error!'); };
    sinon.stub(console, 'warn');

    loadJSON('/penguins.json', callback);
    assert.isFalse(callback.called);
    console.warn.restore();
  });
});
