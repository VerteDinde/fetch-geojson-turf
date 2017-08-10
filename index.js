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
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
};


      // return simplified.features.map(feature => {
      //   const newObj = {};
      //   Object.keys(feature.properties).map(key => {
      //     for (let i = 0; i < props.length; i++) {
      //       if (key === props[i]) {
      //         newObj[props[i]] = feature.properties[key];
      //       }
      //     }
      //     // console.log(newObj);
      //     feature.properties = newObj;
      //   });
      // });
