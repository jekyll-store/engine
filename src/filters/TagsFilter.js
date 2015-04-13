function TagsFilter(field, tags) {
  return function(display) {
    var products = display.get('products');

    products = products.filter(function(product) {
      return tags.indexOf(product.get(field)) >= 0;
    });

    return display.set('products', products);
  };
}

module.exports = TagsFilter;