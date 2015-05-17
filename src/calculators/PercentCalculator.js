var B = require('big.js');

function PercentCalculator(args) {
  var ratio = B(args.percent).div(100);
  return function(order) { return +ratio.times(order.totals[args.field]); };
}

module.exports = PercentCalculator;