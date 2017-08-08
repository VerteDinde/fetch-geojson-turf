# fetch-geojson-turf

This module fetches a geojson file from an http link and tries to reduce the file size by:

* Removing unnecessary digits via `turf.truncate` 
* Simplifying geometry via `turf.simplify()`
* Keeping only specified property values

## Usage

```js
var fs = require('fs')
var simplify = require('fetch-simple-geojson')

var data = 'https://opendata.arcgis.com/datasets/cd78700c5c5c4a338090ce4c7b996f03_3.geojson'
var options = {
  tolerance: 0.0001,
  highQuality: true,
  keepProperties: ['NAME']
}

simplify(data, options, function (err, result) {
  if (err) return console.error(err)
  fs.writeFile('output.json', JSON.stringify(result), function (err) {
    if (err) return console.error(err)
    console.log('SUCCESS!!')
  })
})
```
