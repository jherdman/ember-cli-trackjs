'use strict';

module.exports = {
  name: require('./package').name,

  contentFor(type, config) {
    let trackOpts;
    let trackConfig;
    let trackConfiguration;

    if (type === 'head-footer') {
      trackOpts = config.trackJs || {};
      trackConfig = trackOpts.config || {};

      trackConfiguration = `<script type="text/javascript" id="trackjs-configuration">window._trackJs = ${JSON.stringify(trackConfig)};</script>`;

      return trackConfiguration;
    }
  },

  included(app) {
    this._super.included(app);

    app.import(require.resolve('trackjs'));
  }
};
