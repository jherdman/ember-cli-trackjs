# ember-cli-trackjs [![Build Status][travis-badge]][travis-badge-url] [![Dependency Status][david-badge]][david-badge-url]

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
    addon: {
      url: "path/to/trackjs.js" // provided by TrackJS
    },
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

## Usage

A service is exposed on your routes and controllers that you can use to report
errors instead of having to use the global `window.trackJs` object.

### Example in a Route

```javascript
export default {
  beforeModel: function () {
    this.trackjs.track('oh, snap. something bad happened');
  }
};
```

### Example in a Controller

```javascript
export default Ember.Controller.extend({
  reportSomethingForSomeReason: function () {
    this.trackjs.track('oh, snap. something bad happened');
  }.on('init')
});
```

## Installation

```
ember install:addon ember-cli-trackjs
```

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

[travis-badge]: https://travis-ci.org/jherdman/ember-cli-trackjs.svg?branch=master
[travis-badge-url]: https://travis-ci.org/jherdman/ember-cli-trackjs
[david-badge]: https://david-dm.org/jherdman/ember-cli-trackjs.svg
[david-badge-url]: https://david-dm.org/jherdman/ember-cli-trackjs
