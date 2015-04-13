// Includes
var Reflux = require('reflux');
var I = require('immutable');
var listenAndMix = require('../mixins/listenAndMix');
var Totals = require('../services/Totals');

var CheckoutStore = Reflux.createStore({
  // Public
  listenables: [ require('../Actions') ],
  adjustors: [require('./DeliveryStore')],
  mixins: [listenAndMix(require('./BasketStore'), 'update')],
  getInitialState: function() { return t.checkout(); },
  onRefreshCheckout: function() { t.update(); },

  // Private
  update: function() { t.trigger(t.checkout()); },
  checkout: function() {
    var order = t.newOrder();

    t.adjustors.forEach(function(adjustor) {
      order = adjustor.adjust(order);
    });

    return { order: order };
  },
  newOrder: function() {
    var totals = Totals.accumulate(t.basket);
    totals = totals.set('order', totals.get('price'));
    return I.Map({ adjustments: I.List(), errors: I.List(), totals: totals });
  }
});

var t = module.exports = CheckoutStore;
