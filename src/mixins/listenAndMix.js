function listenAndMix(store, callback) {
  return {
    init: function() { this.listenTo(store, this._mixAndUpdate, this._mix); },
    _mix: function(obj) { for(var key in obj) { this[key] = obj[key]; } },
    _mixAndUpdate: function(obj) {
      this._mix(obj);
      if(callback) { this[callback](); }
    }
  };
}

module.exports = listenAndMix;