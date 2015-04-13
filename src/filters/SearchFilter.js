function SearchFilter(field, word) {
  return function(display) {
  	var products = display.get('products');

    products = products.filter(function(product) {
      return product.get(field).match(new RegExp(word, 'i'));
    });

    return display.set('products', products);
  };
}

module.exports = SearchFilter;