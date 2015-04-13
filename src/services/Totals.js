// Includes
var I = require('immutable');
var B = require('big.js');

var Totals = {
	// Public
	fields: ['price', 'weight'],
	accumulate: function(basket) {
		var totals = {};
	  t.initialize(totals);

	  basket.forEach(function(item) {
	    t.fields.forEach(function(field) {
	    	t.addItem(totals, item, field);
	    });
	  });

	  return I.Map(totals);
	},

	// Private
	initialize: function(totals) {
		t.fields.forEach(function(field) { totals[field] = B(0); });
	},

	addItem: function(totals, item, field) {
		var productValue = item.get(field);
		if(productValue) {
		  var itemValue = productValue.times(item.get('quantity'));
			totals[field] = totals[field].plus(itemValue);
		}
	}
};

var t = module.exports = Totals;