function PercentCalculator(args) {
  var ratio = args.percent.div(100);
  return function(order) {
    return order.getIn(['totals', args.field]).times(ratio);
  };
}

module.exports = PercentCalculator;