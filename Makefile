MINIFY=minify

build:
	@make compile
	@make jsdoc

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
	$(MINIFY) -b -o dist/whosonfirst.uri.min.js src/whosonfirst.uri.js
	$(MINIFY) -b -o dist/whosonfirst.data.min.js src/whosonfirst.data.js
	$(MINIFY) -b -o dist/whosonfirst.flags.existential.min.js src/whosonfirst.flags.existential.js
	$(MINIFY) -b -o dist/whosonfirst.namify.min.js src/whosonfirst.namify.js
	$(MINIFY) -b -o dist/whosonfirst.geojson.min.js src/whosonfirst.geojson.js
	$(MINIFY) -b -o dist/whosonfirst.bundle.min.js \
		ext/localforage.js \
		src/whosonfirst.uri.js \
		src/whosonfirst.data.js \
		src/whosonfirst.flags.existential.js \
		src/whosonfirst.namify.js \
		src/whosonfirst.geojson.js
