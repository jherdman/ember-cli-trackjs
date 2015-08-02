## 0.1 to 0.2

* Remove configuration for a TrackJS URL. TrackJS is now bundled with this
  add-on. Try `ember install ember-cli-trackjs` to ensure this change has
  been made.

  If you wish to continue using an external copy of TrackJS, please
  configure your application as so:

  ```javascript
  // config/environmnet.js
  var ENV = {
    trackJs: {
      url: '//some-url-for-trackjs.com/foo.js',
      config: {
        // your other config options here
      }
    }
  };

  // ember-cli-build.js
  module.exports = function(defaults) {
    var app = new EmberApp(defaults, {
      'ember-cli-trackjs': {
        cdn: true
      }
    });
  };
  ```
