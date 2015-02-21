# ember-cli-trackjs

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
    token: "1234567890"
  }
};

if (environment === 'test') {
  ENV.trackJs.enabled = false;
}
```

See? Pretty much like you'd expect.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
