var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var TieredCalculator = require('../../src/calculators/TieredCalculator');

describe('TieredCalculator', function() {
  var calc = TieredCalculator({
    field: 'volume',
    tiers: [[0, 3.29], [0.5, 4.59], [1.2, 5.39]]
  });

  it('calculates', function() {
    order = I({ totals: { volume: 0.25 } });
    assert.equal(calc(order), 3.29);

    order = I({ totals: { volume: 0.89 } });
    assert.equal(calc(order), 4.59);

    order = I({ totals: { volume: 3.25 } });
    assert.equal(calc(order), 5.39);
  });

  it('has inclusive lowerbounds and exclusive upperbounds', function() {
    order = I({ totals: { volume: 1.2 } });
    assert.equal(calc(order), 5.39);
  });

  it('supports close ended tiers', function() {
    calc = TieredCalculator({
      field: 'volume',
      tiers: [[0, 3.29], [0.5, 4.59], [1.2]]
    });

    order = I({ totals: { volume: 3.25 } });
    assert.equal(calc(order), undefined);
  });
});
