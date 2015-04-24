// Includes
var Reflux = require('reflux');
var I = require('immutable');
var B = require('big.js');
var listenAndMix = require('../mixins/listenAndMix');
var keptInStorage = require('../mixins/keptInStorage');

var BasketStore = Reflux.createStore({
  // Public
  listenables: [ require('../Actions') ],
  mixins: [
    listenAndMix(require('./ProductsStore')),
    keptInStorage('basket', I.Map)
  ],

  onRemoveItem: function(args) {
    t.basket = t.basket.remove(args.name);
    t.update();
  },

  onSetItem: function(args) {
    var product = t.basket.get(args.name) || t.products.get(args.name);
    t.basket = t.basket.set(args.name, product.set('quantity', B(args.quantity)));
    t.update();
  },

  onCompleted: function() {
    t.session.set('basket', {});
  }
});

var t = module.exports = BasketStore;
