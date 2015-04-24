var I = require('immutable');

function keptInStorage(key, defaultType) {
  return {
  	// Public
    init: function() {
    	this[key] = I.fromJS(this.session.get(key)) || defaultType();
    },
  	getInitialState: function() { return this.payload(); },

    // Private
  	session: require('../utils/Session'),
  	update: function() {
	    this.session.set(key, this[key].toJS());
	    this.trigger(this.payload());
  	},
  	payload: function() {
	    var obj = {};
	    obj[key] = this[key];
  		return obj;
  	}
  };
}

module.exports = keptInStorage;
