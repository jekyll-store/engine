function FixedCalculator(args) {
  return function(order) { return args.amount; };
}

module.exports = FixedCalculator;