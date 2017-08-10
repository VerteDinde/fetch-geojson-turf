# fetch-simple-geojson-p

This module fetches a geojson file from an http link and tries to reduce the file size by:

* Removing unnecessary digits via `turf.truncate` 
* Simplifying geometry via `turf.simplify()`
* Keeping only specified property values

This module is promisified; a version for callbacks can be found under `fetch-simple-geojson`.

## Usage

```js
const fs = require('fsp')
const simplify = require('fetch-simple-geojson-p')

const data = 'https://opendata.arcgis.com/datasets/cd78700c5c5c4a338090ce4c7b996f03_3.geojson'
const options = {
  tolerance: 0.0001,
  highQuality: true,
  keepProperties: ['NAME']
}

simplify(data, options)
  .then(result => {
    console.log('File Successfully Written.');
    return fsp.writeFile('output.json', JSON.stringify(result));
  });
```
