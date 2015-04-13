function RangesFilter(field, ranges) {
  return function(display) {
    var products = display.get('products');

    products = products.filter(function(product) {
      return ranges.some(function(range) {
        var value = product.get(field);
        if(value.gte(range[0]) && value.lte(range[1])) { return true; }
      });
    });

    return display.set('products', products);
  };
}

module.exports = RangesFilter;