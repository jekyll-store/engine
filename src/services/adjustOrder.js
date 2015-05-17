var I = require('seamless-immutable');
var B = require('big.js');

function adjustOrder(order, label, amount) {
  var adjustments = order.adjustments.concat({ label: label, amount: amount })
  var total = +B(order.totals.order).plus(amount);
  var totals = order.totals.merge({ order: total });
  return order.merge({ adjustments: adjustments, totals: totals });
}

module.exports = adjustOrder;