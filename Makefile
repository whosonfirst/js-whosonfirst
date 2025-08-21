MINIFY=minify

jsdoc:
	jsdoc -d docs src/whosonfirst.data.js

compile:
	mkdir -p dist
	$(MINIFY) -b -o dist/whosonfirst.min.js \
		ext/localforage.js \
		src/whosonfirst.uri.js \
		src/whosonfirst.data.js \
		src/whosonfirst.namify.js \
		src/whosonfirst.geojson.js
