// Includes
var Reflux = require('reflux');
var I = require('immutable');
var listenAndMix = require('../mixins/listenAndMix');

var DisplayStore = Reflux.createStore({
  // Public
  listenables: [require('../Actions')],
  mixins: [listenAndMix(require('./ProductsStore'), 'update')],
  getInitialState: function() { return t.filterDisplay(); },
  onSetDisplayFilter: function(args) {
    t.filters = t.filters.set(args.name, args.filter);
    t.update();
  },
  onRemoveDisplayFilter: function(args) {
    t.filters = t.filters.remove(args.name);
    t.update();
  },

  // Private
  filters: I.Map(),
  update: function() { t.trigger(t.filterDisplay()); },

  filterDisplay: function() {
    var display = I.Map({ products: t.products.toList() });

    t.filters
      .sortBy(function(filter) { return filter.precedence || 0; })
      .forEach(function(filter) { display = filter(display); });

    return { display: display };
  }
});

var t = module.exports = DisplayStore;
