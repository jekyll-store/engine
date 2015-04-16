// Includes
var Reflux = require('reflux');
var I = require('immutable');
var Walker = require('../utils/Walker');

var ProductsStore = Reflux.createStore({
  // Public
  listenables: [require('../Actions')],
  getInitialState: function() { return { products: t.products }; },
  onLoadProducts: function(args) {
    t.products = I.Map();

    args.products.forEach(function(product) {
      t.products = t.products.set(product.name, I.fromJS(Walker.toBig(product)));
    });

    t.trigger({ products: t.products });
  },

  //Private
  products: I.Map()
});

var t = module.exports = ProductsStore;