// Includes
var I = require('immutable');

function adjustOrder(order, label, amount) {
  var adjustment = I.Map({label: label, amount: amount });
  order = order.set('adjustments', order.get('adjustments').push(adjustment));

  var total = order.getIn(['totals', 'order']).plus(amount);
  order = order.setIn(['totals', 'order'], total);

  return order;
}

module.exports = adjustOrder;