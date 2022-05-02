# ember-cli-trackjs [![npm version][npm-badge]][npm-badge-url] [![Build Status][ci-badge]][ci-badge-url] [![Dependency Status][david-badge]][david-badge-url] [![Ember Observer Score][ember-observer]][ember-observer-url]

Handles all of the boilerplate shit you need to use TrackJS in your fancy Ember
application.

## Compatibility

- Ember.js v3.24 or above
- Ember CLI v3.24 or above
- Node.js v14 or above

## Installation

```
ember install ember-cli-trackjs
```

## Settings

Configure TrackJS in your application's `config/environment.js` file. Please
see the [TrackJS documentation](https://docs.trackjs.com/browser-agent/sdk-reference/agent-config/)
for specific configuration options.

```javascript
// config/environment.js
module.exports = function () {
  let ENV = {
    trackjs: {
      application: 'my-app', // defaults to `ENV.APP.name`
      version: '1.2.3', // defaults to `ENV.APP.version`
      token: '1234567890',
    },
  };

  if (environment === 'test') {
    ENV.trackjs.token = null;
  }

  return ENV;
};
```

See? Pretty much like you'd expect. The `ENV.APP.name` and `ENV.APP.version` are provided by [ember-cli-app-version](https://github.com/ember-cli/ember-cli-app-version#ember-cli-app-version--).

### One Caveat

TrackJS supports `onError` configuration option that is a function.
This has been a bit problematic ([#4](https://github.com/jherdman/ember-cli-trackjs/issues/4)) as Ember CLI's
`config/environment.js` does not allow you to include function options.

To work around this problem we can use the `configure()` function in an initializer:

```javascript
// app/instance-initializers/trackjs.js
export { initialize as parent } from 'ember-cli-trackjs/instance-initializers/trackjs';

export function initialize(appInstance) {
  parent(...arguments);

  const trackjs = appInstance.lookup('service:trackjs');

  trackjs.configure({
    onError(payload, err) {
      // exclude errors from log in page
      if (payload.url && payload.url.indexOf('login') > 0) {
        return false;
      }

      return true;
    },
  });
}

export default {
  initialize,
};
```

Yeah, it's not ideal. I'm open to pull requests to make this sexier :)

## Usage

The `trackjs` service can be injected into any framework object that you can use to report
errors. This service provides same API as the TrackJS agent itself, see [TrackJS's documentation](https://docs.trackjs.com/browser-agent/sdk-reference/agent-methods/) for a complete list of available methods.

```javascript
// app/routes/index.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service trackjs;

  beforeModel() {
    this.trackjs.track('oh, snap. something bad happened');
  }
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

[npm-badge]: https://badge.fury.io/js/ember-cli-trackjs.svg
[npm-badge-url]: https://badge.fury.io/js/ember-cli-trackjs
[ci-badge]: https://github.com/jherdman/ember-cli-trackjs/actions/workflows/ci.yml/badge.svg
[ci-badge-url]: https://github.com/jherdman/ember-cli-trackjs/actions/workflows/ci.yml
[david-badge]: https://david-dm.org/jherdman/ember-cli-trackjs.svg
[david-badge-url]: https://david-dm.org/jherdman/ember-cli-trackjs
[ember-observer]: http://emberobserver.com/badges/ember-cli-trackjs.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-cli-trackjs
