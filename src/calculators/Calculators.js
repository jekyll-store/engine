var Calculators = {
  Fixed: require('./FixedCalculator'),
  Percent: require('./PercentCalculator'),
  Tiered: require('./TieredCalculator')
};

module.exports = Calculators;