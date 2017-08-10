var fsp = require('fsp');
var simplify = require('./index');

var data = 'https://opendata.arcgis.com/datasets/cd78700c5c5c4a338090ce4c7b996f03_3.geojson';
var options = {
  tolerance: 0.0001,
  highQuality: true,
  keepProperties: ['NAME']
};

simplify(data, options)
  .then(result => {
    console.log('File Successfully Written.');
    return fsp.writeFile('output.json', JSON.stringify(result));
  });