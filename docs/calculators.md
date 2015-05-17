# Calculators

## FixedCalculator

Returns a fixed amount, regardless of the order.

Example:

```javascript
JekyllStoreEngine.Calculators.Fixed({ amount: 3.50 });
```

## PercentCalculator

Returns a percentage of one of the order's totals.

Example:

```javascript
JekyllStoreEngine.Calculators.Percent({ field: 'price', percent: 25 });
```

## TieredCalculator

Returns an amount dependent on which tier one of the order's totals falls into.

Example:

```javascript
JekyllStoreEngine.Calculators.Tiered({
  field: 'volume',
  tiers: [
  	[0, 3.29],   // 0 < volume <= 0.5, it returns 3.29
  	[0.5, 4.59], // 0.5 < volume <= 1.2, it returns 4.59
  	[1.2]        // volume > 1.2, it returns undefined
  ]
});
```
