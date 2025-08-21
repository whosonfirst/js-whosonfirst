# js-whosonfirst

JavaScript libraries for working with Who's On First data.

## Build

There is a precompiled and minified package in [dist/whosonfirst.min.js](dist/whosonfirst.min.js) but if you need or want to build your copy the easiest thing to do is use the handy `compile` Makefile target. For example:

```
$> make compile
mkdir -p dist
minify -b -o dist/whosonfirst.min.js \
		ext/localforage.js \
		src/whosonfirst.uri.js \
		src/whosonfirst.data.js \
		src/whosonfirst.namify.js \
		src/whosonfirst.geojson.js
(3.079334ms, 106 kB,  35 kB,  32.9%,  34 MB/s) - (ext/localforage.js + src/whosonfirst.uri.js + src/whosonfirst.data.js + src/whosonfirst.namify.js + src/whosonfirst.geojson.js) to dist/whosonfirst.min.js
```

_Note: This assumes you have installed the [tdwolff/minify](https://github.com/tdewolff/minify) binary._

## Packages

### whosonfirst.data

### whosonfirst.flags

### whosonfirst.geojson

### whosonfirst.namify

### whosonfirst.placetypes

### whosonfirst.uri

## Examples

Consult the [examples](examples) folder.