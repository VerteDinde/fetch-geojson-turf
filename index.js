const turf = require('@turf/turf');
const request = require('request-promise');

module.exports = (url, options) => {
  const opts = { json: true };

  request(url, opts, (err, res, body) => {
    return turf.truncate(body);
  })
    .then(truncated => {
      return turf.simplify(truncated, options.tolerance, options.highQuality);
    })
    .then(simplified => {
      const props = options.keepProperties;

      return simplified.features.map(feature => {
        const newObj = {};
        Object.keys(feature.properties).map(key => {
          for (let i = 0; i < props.length; i++) {
            if (key === props[i]) {
              newObj[props[i]] = feature.properties[key];
            }
          }
          console.log(newObj);
          feature.properties = newObj;
        });
      });
    })
    .then(data => {
      console.log('Final: ', data);
    });
};





// simplify(data, options, function (err, result) {
// output: geojson file
