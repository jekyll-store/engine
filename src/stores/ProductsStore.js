// Includes
var Reflux = require('reflux');
var I = require('immutable');
var Walker = require('../utils/Walker');

var ProductsStore = Reflux.createStore({
  // Public
  listenables: [require('../Actions')],
  getInitialState: function() { return { products: I.Map() }; },
  onLoadProducts: function(args) {
    var products = I.Map();

    args.products.forEach(function(product) {
      products = products.set(product.name, I.fromJS(Walker.toBig(product)));
    });

    this.trigger({ products: products });
  }
});

module.exports = ProductsStore;