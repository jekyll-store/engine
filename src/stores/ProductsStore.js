var Reflux = require('reflux');
var resource = require('../mixins/resource');

var ProductsStore = Reflux.createStore({
  mixins: [resource('products')],
  onLoadProducts: function(args) { this.toLookUp('name', args); }
});

module.exports = ProductsStore;
