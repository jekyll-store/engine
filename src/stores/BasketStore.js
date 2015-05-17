// Includes
var Reflux = require('reflux');
var listenAndMix = require('../mixins/listenAndMix');
var keptInStorage = require('../mixins/keptInStorage');
var m = require('../Utils').mapping;

var BasketStore = Reflux.createStore({
  // Public
  listenables: [require('../Actions')],
  mixins: [
    listenAndMix(require('./ProductsStore')),
    keptInStorage('basket', {})
  ],

  onRemoveItem: function(args) {
    t.basket = t.basket.without(args.name);
    t.update();
  },

  onSetItem: function(args) {
    var item = t.basket[args.name] || t.products[args.name];
    item = item.merge({ quantity: args.quantity });
    t.basket = t.basket.merge(m(args.name, item));
    t.update();
  },

  onCompleted: function() { t.session.set('basket', {}); }
});

var t = module.exports = BasketStore;
