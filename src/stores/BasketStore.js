// Includes
var Reflux = require('reflux');
var I = require('immutable');
var B = require('big.js');
var listenAndMix = require('../mixins/listenAndMix');

var BasketStore = Reflux.createStore({
  // Public
  listenables: [ require('../Actions') ],
  mixins: [listenAndMix(require('./ProductsStore'))],
  getInitialState: function() { return { basket: t.basket }; },

  init: function() {
    this.basket = I.fromJS(this.session.get('basket')) || I.Map();
  },

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
  },

  //Private
  session: require('../utils/session'),
  update: function() {
    t.session.set('basket', t.basket.toJS());
    t.trigger({ basket: t.basket });
  }
});

var t = module.exports = BasketStore;
