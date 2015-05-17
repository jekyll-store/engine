// Includes
var I = require('seamless-immutable');
var B = require('big.js');

var Totals = {
  // Public
  fields: ['price', 'weight'],
  accumulate: function(basket) {
    var totals = {};

    t.fields.forEach(function(field) {
      totals[field] = 0;

      for(var name in basket) {
        var item = basket[name];

        if(item[field]) {
          totals[field] = +B(item[field]).times(item.quantity).plus(totals[field]);
        }
      }
    });

    return I(totals);
  }
};

var t = module.exports = Totals;