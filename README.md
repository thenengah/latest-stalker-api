# Latest Stalker (API)

Free and open-source api to check which dependencies in your package are using the latest version.

Checkout the [demo](https://latest-stalker.herokuapp.com) and the [module](https://github.com/thenengah/latest-stalker-module).

## Usage

### Curl

```text
curl -F file=@./package.json https://latest-stalker.herokuapp.com/api/stalk
```

## Contribute

To contribute fork this project, make your changes, and submit a pull request.

### Development

```text
git clone https://github.com/thenengah/latest-stalker.git
cd latest-stalker-api
npm intall
npm run build
npm start
```

### Tests

Make sure the tests pass and you have at least one for your contribution.

```test
npm test
```
