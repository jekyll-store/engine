var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'setItem',
  'removeItem',
  'setAddress',
  'setDelivery',
  'loadProducts',
  'loadCountries',
  'loadDeliveryMethods',
  'setPaymentOptions',
  'purchase',
  'completed',
  'refreshCheckout',
  'setErrors'
]);

Actions.setItem.shouldEmit = function(args) { return args.quantity >= 0; };

Actions.loadProducts.shouldEmit = function(args) {
  return keyCheck(args.products, 'name');
};

Actions.loadCountries.shouldEmit = function(args) {
  return keyCheck(args.countries, 'iso');
};

Actions.loadDeliveryMethods.shouldEmit = function(args) {
  return keyCheck(args.methods, 'name');
};

function keyCheck(arr, keyField) {
  var keys = [];

  for(var i = 0; i < arr.length; i ++) {
    var key = arr[i][keyField];

    if(!key) {
      console.warn('Key Check failed: Expected ' + keyField);
      return false;
    }

    if(keys.indexOf(key) >= 0) {
      console.warn('Key Check failed: "' + key + '" is not a unique ' + keyField);
      return false;
    }

    keys.push(key);
  }

  return true;
}

module.exports = Actions;
