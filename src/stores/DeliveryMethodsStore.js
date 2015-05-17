// Includes
var Reflux = require('reflux');
var I = require('seamless-immutable');
var listenAndMix = require('../mixins/listenAndMix');
var m = require('../Utils').mapping;
var intersects = require('../Utils').intersects;

var DeliveryMethodsStore = Reflux.createStore({
  // Public
  listenables: [require('../Actions')],
  mixins: [listenAndMix(require('./AddressStore'), 'update')],
  getInitialState: function() { return { methods: t.available }; },
  onLoadDeliveryMethods: function(args) {
    args.methods.forEach(function(method) {
      t.methods = t.methods.merge(m(method.name, {
        name: method.name,
        zones: method.zones,
        calculator: t.calculators[method.calculator](method.args)
      }));
    });

    t.update();
  },

  //Private
  methods: I({}),
  available: I({}),
  calculators: require('../calculators/Calculators'),
  update: function() {
    var zones = t.country.zones || [];
    t.available = {};

    for(var name in t.methods) {
      if(intersects(t.methods[name].zones, zones)) {
        t.available[name] = t.methods[name];
      }
    }

    t.available = I(t.available);
    t.trigger({ methods: t.available });
  }
});

var t = module.exports = DeliveryMethodsStore;