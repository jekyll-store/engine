exports.first = function(obj) { for(var k in obj) { return obj[k]; } };

exports.mapping = function(key, value) {
  var obj = {};
  obj[key] = value;
  return obj;
};

exports.Session = {
  set: function(k, v) {
  	if(this.safe) { localStorage.setItem(k, JSON.stringify(v)); }
  },
  get: function(k) {
  	if(this.safe) { return JSON.parse(localStorage.getItem(k)); }
  },
  safe: typeof(localStorage) !== "undefined"
};

exports.intersects = function(arr1, arr2) {
  for(var i = 0; i < arr1.length; i++) {
    if(arr2.indexOf(arr1[i]) >= 0) { return true; }
  }
  return false;
};
