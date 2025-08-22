# js-whosonfirst

JavaScript libraries for working with Who's On First data.

## Build

There is a precompiled and minified package in [dist/whosonfirst.bundle.min.js](dist/whosonfirst.bundle.min.js) but if you need or want to build your copy the easiest thing to do is use the handy `compile` Makefile target. For example:

```
$> make compile
mkdir -p dist
...
minify -b -o dist/whosonfirst.bundle.min.js \
		ext/localforage.js \
		src/whosonfirst.uri.js \
		src/whosonfirst.data.js \
		src/whosonfirst.placetypes.js \
		src/whosonfirst.flags.existential.js \
		src/whosonfirst.namify.js \
		src/whosonfirst.geojson.js
(2.653917ms, 132 kB,  43 kB,  32.6%,  50 MB/s) - (ext/localforage.js + src/whosonfirst.uri.js + src/whosonfirst.data.js + src/whosonfirst.placetypes.js + src/whosonfirst.flags.existential.js + src/whosonfirst.namify.js + src/whosonfirst.geojson.js) to dist/whosonfirst.bundle.min.js
```

Minified copies of all the component libraries in the [src](src) directory are also created if you don't everything included in the bundle.

_Note: This assumes you have installed the [tdwolff/minify](https://github.com/tdewolff/minify) binary._

## Documentation

Consult the [docs](docs) folder.

## Examples

Consult the [examples](examples) folder.