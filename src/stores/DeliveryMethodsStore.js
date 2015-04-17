// Includes
var Reflux = require('reflux');
var I = require('immutable');
var Walker = require('../utils/Walker');
var listenAndMix = require('../mixins/listenAndMix');
var Calculators = require('../calculators/Calculators');

var DeliveryMethodsStore = Reflux.createStore({
  // Public
  listenables: [require('../Actions')],
  mixins: [listenAndMix(require('./AddressStore'), 'update')],
  getInitialState: function() { return { methods: t.available }; },
  onLoadDeliveryMethods: function(args) {
    t.methods = I.Map();

    args.methods.forEach(function(method) {
      t.methods = t.methods.set(method.name, I.Map({
        name: method.name,
        zones: I.Set(method.zones),
        calculator: Calculators[method.calculator](Walker.toBig(method.args))
      }));
    });

    t.update();
  },

  //Private
  methods: I.Map(),
  available: I.Map(),
  update: function() {
    var zones = t.country.get('zones') || I.Set();
    t.available = t.methods.filter(function(method) {
      return !zones.intersect(method.get('zones')).isEmpty();
    });
    t.trigger({ methods: t.available });
  }
});

var t = module.exports = DeliveryMethodsStore;