'use strict';

module.exports = {
  name: require('./package').name,

  contentFor(type, config) {
    let trackOpts;
    let trackConfig;
    let trackConfiguration;
    let trackBoilerPlate;

    if (type === 'head-footer') {
      trackOpts = config.trackJs || {};
      trackConfig = trackOpts.config || {};

      trackConfiguration = `<script type="text/javascript" id="trackjs-configuration">window._trackJs = ${JSON.stringify(trackConfig)};</script>`;

      if (trackOpts.url) {
        trackBoilerPlate = `<script type="text/javascript" id="trackjs-boilerplate" src="${trackOpts.url}" crossorigin="anonymous"></script>`;
      }

      return [trackConfiguration, trackBoilerPlate].join('\n');
    }
  },

  included(app) {
    this._super.included(app);

    let options = app.options['ember-cli-trackjs'];

    if (!(options && options.cdn) && (!process.env.EMBER_CLI_FASTBOOT)) {
      app.import(require.resolve('trackjs'));
    }
  }
};
