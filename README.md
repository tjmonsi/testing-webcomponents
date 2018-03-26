# Testing Web components
It's a guide to create testers from webcomponents

## See how it runs?

### Install dependencies
Install dev dependencies to make it work
```
npm i
```

### Run
```
npm test
```

It will run the following unit tests specified in the `runner.html` inside the `test` folder

## How to copy and use in my code?

#### Have package.json
If you don't have one, run `npm init` to create one.

#### Add these packages inside the devDependencies in package.json
```
"devDependencies": {
  "@polymer/iron-test-helpers": "0.0.3",
  "babel-eslint": "^8.2.1",
  "babel-plugin-external-helpers": "^6.22.0",
  "babel-plugin-transform-object-rest-spread": "^6.26.0",
  "babel-plugin-transform-runtime": "^6.23.0",
  "babel-preset-env": "^1.6.1",
  "chai": "^4.1.2",
  "eslint": "^4.16.0",
  "eslint-config-semistandard": "^12.0.0",
  "eslint-config-standard": "^11.0.0-beta.0",
  "eslint-plugin-chai-friendly": "^0.4.1",
  "eslint-plugin-html": "^3.2.2",
  "eslint-plugin-import": "^2.8.0",
  "eslint-plugin-mocha": "^4.12.1",
  "eslint-plugin-node": "^5.2.1",
  "eslint-plugin-promise": "^3.6.0",
  "eslint-plugin-standard": "^3.0.1",
  "lodash": "^3.10.1",
  "mocha": "^5.0.4",
  "semistandard": "^12.0.1",
  "size-limit": "^0.16.1",
  "wct-browser-legacy": "0.0.1-pre.11",
  "web-component-tester": "^6.5.0"
}
```

These installs the following files that will be needed in linting, sizing, and testing your project.

#### Add these on your scripts in package.json

```
"scripts": {
  "size": "./node_modules/.bin/size-limit",
  "semistandard": "./node_modules/.bin/semistandard",
  "wct": "./node_modules/.bin/wct --npm",
  "wct-prod": "./node_modules/.bin/wct --npm --configFile wct-prod.conf.json",
  "test": "npm run semistandard && npm run size && npm run wct-prod",
  "prepublishOnly": "npm test"
}
```

These allow us to run the test script using `npm test` command or just run specific parts like `npm run wct`.
The scripts are as follows:

- `npm run size` - runs size-limit to check size of element
- `npm run semistandard` - runs linting using semistandard config
- `npm run wct` - runs testing with persistence flag set to true so that you can manually refresh the browser testing machine whenever you update your code
- `npm run wct-prod` - runs testing that opens chrome and firefox
- `npm run prepublishOnly` - runs test before publishing to npm

#### Add these two other attribtues in your package.json

```
"size-limit": [
  {
    "path": "your-component.js",
    "limit": "3KB"
  }
],
"semistandard": {
  "parser": "babel-eslint",
  "ignore": [
    "test/*",
    "dist/*",
    "polyfills/*"
  ],
  "env": [
    "mocha"
  ]
}
```

This allows you to test the size of your element (to be under a specified size) and the linting rules using semistandard

#### Copy the following files in this project to yours
- `.eslintignore` - ignore files or folders when testing lint
- `.eslintrc.js` - for linting rules when using and IDE like VSCode
- `.travis.yml` - allows you to run the test on Travis
- `jsconfig.json` - for VSCode rules on types
- `wct-prod.conf.json` - testing configuration that opens firefox and chrome for testing
- `wct-conf.json` - testing configuration that runs testing with persistence flag set to true so that you can manually refresh the browser testing machine whenever you update your code
- `test/runner.html` - this is where your test starts, see next part

#### Examine Runner.html
```html
<html>
  <head>
    <meta charset="utf-8">
    <script>
      WCT = {
        mochaOptions: {
          timeout: 60000
        }
      }
    </script>
    <script src="../../../node_modules/wct-browser-legacy/browser.js"></script>
  </head>
  <body>
    <script>
      'use script';
      let suites = [
        './unit/test-component.test.html'
      ];
      WCT.loadSuites(suites);
    </script>
  </body>
</html>
```

The changeable part is the `suites`. Add the test config files that you want to add. My recommended pattern is inside the unit folder.

#### Once done, install dependencies and run
```
npm i
npm test
```