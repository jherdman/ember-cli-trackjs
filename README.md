# ember-cli-trackjs [![npm version][npm-badge]][npm-badge-url] [![Build Status][travis-badge]][travis-badge-url] [![Dependency Status][david-badge]][david-badge-url] [![Ember Observer Score][ember-observer]][ember-observer-url]

Handles all of the boilerplate shit you need to use TrackJS in your fancy Ember
application.

## Settings

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

## Usage

A service is exposed on your routes and controllers that you can use to report
errors instead of having to use the global `window.trackJs` object, and you
don't want to load TrackJS in all of your environments.

### Example in a Route

```javascript
export default {
  beforeModel() {
    this.trackjs.track('oh, snap. something bad happened');
  }
};
```

### Example in a Controller

```javascript
export default Ember.Controller.extend({
  reportSomethingForSomeReason() {
    this.trackjs.track('oh, snap. something bad happened');
  }
});
```

## Installation

```
ember install ember-cli-trackjs
```

## Running Tests

* `npm test` -- the entire test suite
* `ember test --server` -- you're developing a new feature <3

## Building

* `ember build`

[npm-badge]: https://badge.fury.io/js/ember-cli-trackjs.svg
[npm-badge-url]: (http://badge.fury.io/js/ember-cli-trackjs)
[travis-badge]: https://travis-ci.org/jherdman/ember-cli-trackjs.svg?branch=master
[travis-badge-url]: https://travis-ci.org/jherdman/ember-cli-trackjs
[david-badge]: https://david-dm.org/jherdman/ember-cli-trackjs.svg
[david-badge-url]: https://david-dm.org/jherdman/ember-cli-trackjs
[ember-observer]: http://emberobserver.com/badges/ember-cli-trackjs.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-cli-trackjs
