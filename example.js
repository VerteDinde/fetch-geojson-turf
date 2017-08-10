var fs = require('fs');
var simplify = require('.');

var data = 'https://opendata.arcgis.com/datasets/cd78700c5c5c4a338090ce4c7b996f03_3.geojson';
var options = {
  tolerance: 0.0001,
  highQuality: true,
  keepProperties: ['NAME']
};

simplify(data, options, function (err, result) {
  if (err) return console.error(err);
  console.log('Here');
  fs.writeFile('output.json', JSON.stringify(result), function (err) {
    if (err) return console.error(err);
    console.log('SUCCESS!!');
  });
});