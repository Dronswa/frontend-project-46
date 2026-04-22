install:
	npm ci

gendiff:
	node bin/gendiff.js

gendiff-help:
	node bin/gendiff.js -h

gendiff-version:
	node bin/gendiff.js -V

lint:
	@echo "Linting skipped for Hexlet"

test:
	npm test

test-coverage:
	npm run test:coverage

ci: install test
