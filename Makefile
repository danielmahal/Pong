BUNDLE = bin/bundle
UGLIFY = node_modules/.bin/uglifyjs

all: js
js:  public/build/client.js

public/build:
	@mkdir -p $@

public/build/client.js: public/build $(shell find public/src) $(shell find src)
	$(BUNDLE) ./public/src/client.js > $@
