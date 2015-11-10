/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-trackjs',

  contentFor: function (type, config) {
    var trackOpts;
    var trackConfig;
    var trackConfiguration;
    var trackBoilerPlate;
    var addonConfig;

    if (type === 'head-footer') {
      trackOpts = config.trackJs || {};
      trackConfig = trackOpts.config || {};

      trackConfiguration = '<script type="text/javascript" id="trackjs-configuration">window._trackJs = ' + JSON.stringify(trackConfig) + ';</script>';

      if (trackOpts.url) {
        trackBoilerPlate = '<script type="text/javascript" id="trackjs-boilerplate" src="' + trackOpts.url + '" crossorigin="anonymous"></script>';
      }

      return [trackConfiguration, trackBoilerPlate].join('\n');
    }
  },

  included: function (app) {
    this._super.included(app);

    var options = app.options['ember-cli-trackjs'];

    if (!(options && options.cdn)) {
      app.import(app.bowerDirectory + '/trackjs/tracker.js');
    }
  }
};
