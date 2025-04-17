MINIFY=minify

namify:
	mkdir -p dist
	$(MINIFY) -b -o dist/whosonfirst.namify.bundle.min.js \
		src/whosonfirst.php.js \
		src/whosonfirst.net.js \
		src/whosonfirst.uri.js \
		src/whosonfirst.html.namify.js
