var I = require('immutable');

function PageFilter(pageSize, pageNum) {
  var fn = function(display) {
    var products = display.get('products'),
        total    = Math.ceil(products.size / pageSize),
        current  = pageNum <= total ? pageNum : 1,
        start    = (current - 1) * pageSize;

    return display.merge({
      products: products.slice(start, start + pageSize),
      page: {
        current: current,
        numbers: I.Range(1, total + 1),
        prev: current > 1 ? current - 1 : null,
        next: current < total ? current + 1 : null
      }
    });
  };

  fn.precedence = 2;
  return fn;
}

module.exports = PageFilter;