MINIFY=minify

jsdoc:
	jsdoc -d docs \
		src/jsdoc.js \
		src/whosonfirst.data.js \
		src/whosonfirst.uri.js \
		src/whosonfirst.placetypes.js \
		src/whosonfirst.flags.existential.js \
		src/whosonfirst.namify.js \
		src/whosonfirst.geojson.js

compile:
	mkdir -p dist
	$(MINIFY) -b -o dist/whosonfirst.min.js \
		ext/localforage.js \
		src/whosonfirst.uri.js \
		src/whosonfirst.data.js \
		src/whosonfirst.namify.js \
		src/whosonfirst.geojson.js
