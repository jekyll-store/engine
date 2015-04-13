function SortFilter(field, direction) {
  var fn = function(display) {
  	var products = display.get('products');

    products = products.sort(function(a, b) {
    	return a.get(field).cmp(b.get(field));
    });

    if(direction == SortFilter.DESC) { products = products.reverse(); }
    return display.set('products', products);
  };

  fn.precedence = 1;
  return fn;
}

SortFilter.ASC = 'ascending';
SortFilter.DESC = 'descending';

module.exports = SortFilter;