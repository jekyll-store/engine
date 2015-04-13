// Includes
var SuperAgent = require('superagent');

// Public
function loadJSON(url, callback) {
  SuperAgent
    .get(url)
    .set('X-Requested-With', 'XMLHttpRequest')
    .set('Cache-Control', 'no-transform,public,max-age=300,s-maxage=900')
    .end(function(err, resource) {
      if(err) {
        console.warn('Warning: ' + url + ' failed to load.');
      } else {
        callback(resource.body);
      }
    });
}

module.exports = loadJSON;
