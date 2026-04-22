install:
	npm ci

gendiff:
	node bin/gendiff.js $(ARGS)

gendiff-help:
	node bin/gendiff.js -h

gendiff-version:
	node bin/gendiff.js -V

lint:
	npm run lint

test:
	npm test

test-coverage:
	npm run test:coverage

test-watch:
	npm run test:watch

ci: 
	install lint test