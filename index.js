const request = require('request-promise');
const turf = require('@turf/turf');

module.exports = (url, options) => {
  const opts = { json: true };

  return request(url, opts, (err, res, body) => {
    return turf.truncate(body);
  })
    .then(truncated => {
      return turf.simplify(truncated, options.tolerance, options.highQuality);
    })
    .then(simplified => {
      const screenedProperties = options.keepProperties;
      const filtered = simplified.features.map(function (feature) {
        const result = {};
        Object.keys(feature.properties).forEach(function (key) {
          if (screenedProperties.includes(key)) {
            result[key] = feature.properties[key];
          }
        });
        feature.properties = result;
        return feature;
      });
      simplified.features = filtered;
      return simplified.features;
    });
};
