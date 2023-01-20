lint:
	npx eslint .

test:
	npx jest

test-watch:
	npx jest --watch

install-deps:
	npm ci

test-coverage:
	npm test -- --coverage --coverageProvider=v8
