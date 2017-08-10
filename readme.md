# fetch-simple-geojson-p

This module fetches a geojson file from an http link and reduces the file size before implementation. 

`fetch-simple-geojson-p` reduces the file size by:

* Removing unnecessary digits via `turf.truncate` 
* Simplifying geometry via `turf.simplify()`
* Keeping only specified property values

This module is promisified; a version for callbacks can be found under `fetch-simple-geojson`.

## Installation
```bash
$ npm install fetch-simple-geojson-p -S
```

## Usage
Require the module in the file where you'll be simplifying and run as a function `simplify`.

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

##### Data Formats
This module only take input data that is in geoJSON format - not regular json, ndjson or topogeojson. Many geoJSON data sets can be found on `opendata.arcgis.com` or `opendata.gov`. 

##### Available Options
  - `tolerance:` [number] Simplification tolerance (optional, default 1)
  - `highQuality:` [boolean] Whether or not to spend more time to create a higher-quality simplification with a different algorithm (optional; default `false`)
  - `keepProperties:` [array[string, string, ...]] Discards superfluous properties on a geoJSON file, unless specifically mentioned.

  The properties you may or may not want to keep will vary, depending on your geoJSON file, but usually consist of single-depth `{ key: value }` mappings. Common properties include:
  - `OBJECTID`
  - `NAME`

##### Contribute
Accepting pull requests and issues! Click through to our GitHub repo to contribute or post an issue.