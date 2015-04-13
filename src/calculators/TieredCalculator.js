function TieredCalculator(args) {
  return function(order) {
  	var value = order.getIn(['totals', args.field]);

  	for(var i = 0; i < args.tiers.length; i++) {
  		var lowerbound = args.tiers[i][0];

  		if(lowerbound.lte(value)) {
  			var upperbound = (args.tiers[i + 1] || [])[0];

  			if(!upperbound || value.lt(upperbound)) {
  				return args.tiers[i][1];
  			}
  		}
  	}
  };
}

module.exports = TieredCalculator;