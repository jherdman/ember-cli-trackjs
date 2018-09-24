# ember-cli-trackjs [![npm version][npm-badge]][npm-badge-url] [![Build Status][travis-badge]][travis-badge-url] [![Dependency Status][david-badge]][david-badge-url] [![Ember Observer Score][ember-observer]][ember-observer-url]

Handles all of the boilerplate shit you need to use TrackJS in your fancy Ember
application.

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-trackjs
```

Settings
------------------------------------------------------------------------------

Configure TrackJS in your application's `config/environment.js` file. Please
see the [TrackJS documentation](http://docs.trackjs.com/Examples/Developing_Locally)
for specific configuration options.

### Example

```javascript
var ENV = {
  trackJs: {
    config: {
      token: "1234567890"
    }
  }
};

if (environment === 'test') {
  ENV.trackJs.config.enabled = false;
}
```

See? Pretty much like you'd expect.

### One Caveat

TrackJS supports two configuration options that are functions, `onError` and
`serialize`. These have been a bit problematic (#3, #4) as Ember CLI's
`config/environment.js` does not allow you to include function options.

Despite TrackJS' documentation stating that these options cannot be change
after loading, you can, though it's not encouraged. To work around this
problem we can use the `configure()` function in an initializer:

```javascript
// app/instance-initializers/configure-trackjs.js

export function initialize(application) {
  const trackJs = application.container.lookup('service:trackjs');

  trackJs.configure({
    onError(payload, err) {
      // exclude errors from log in page
      if (payload.url && payload.url.indexOf('login') > 0) {
        return false;
      }

      return true;
    }
  });
}

export default {
  name: 'trackjs-error-and-serializer-configuration',
  initialize: initialize
}
```

Yeah, it's not ideal. I'm open to pull requests to make this sexier :)

Usage
------------------------------------------------------------------------------

A service is exposed on your routes and controllers that you can use to report
errors instead of having to use the global `window.trackJs` object, and you
don't want to load TrackJS in all of your environments.

### Example in a Route

```javascript
export default {
  beforeModel() {
    this.get('trackjs').track('oh, snap. something bad happened');
  }
};
```

### Example in a Controller

```javascript
export default Ember.Controller.extend({
  reportSomethingForSomeReason() {
    this.get('trackjs').track('oh, snap. something bad happened');
  }
});
```

### Example in a Component

```javascript
export default Ember.Component.extend({
  trackjs: Ember.inject.service('trackjs'),

  actions: {
    doSomething() {
      // Let's use some other part of the TrackJS API
      this.get('trackjs').attempt(function(a, b) {
        return 5 + 4;
      }, this, 5, 4);
    }
  }
});
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

[npm-badge]: https://badge.fury.io/js/ember-cli-trackjs.svg
[npm-badge-url]: https://badge.fury.io/js/ember-cli-trackjs
[travis-badge]: https://travis-ci.org/jherdman/ember-cli-trackjs.svg?branch=master
[travis-badge-url]: https://travis-ci.org/jherdman/ember-cli-trackjs
[david-badge]: https://david-dm.org/jherdman/ember-cli-trackjs.svg
[david-badge-url]: https://david-dm.org/jherdman/ember-cli-trackjs
[ember-observer]: http://emberobserver.com/badges/ember-cli-trackjs.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-cli-trackjs
