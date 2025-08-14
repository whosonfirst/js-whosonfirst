MINIFY=minify

compile:
	mkdir -p dist
	$(MINIFY) -b -o dist/whosonfirst.min.js \
		ext/localforage.js \
		src/whosonfirst.uri.js \
		src/whosonfirst.data.js \
		src/whosonfirst.geojson.js
