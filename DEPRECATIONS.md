# Deprecations

## 0.2.0

* Configuration style has changed quite drastically. It turns out that Ember
  CLI serializes `config/environment.js` into a JSON object. This means
  certain configuration parameters for TrackJS couldn't be set using this
  approach (e.g. `onError`). Due to this, an initializer has been introduced.
  You can generate your own that occurs after 'set-up-trackjs-service', or
  have one generated for you: `ember generate trackjs-configuration`.

  Two options must unfortunately still be placed in `config/environment.js`:
  token, and URL. This is due to the way addon loading works.
