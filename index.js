/* jshint node: true */
'use strict';

var defaultAddonConfig = {
  url: "//d2zah9y47r7bi2.cloudfront.net/releases/current/tracker.js"
};

module.exports = {
  name: 'ember-cli-trackjs',

  contentFor: function (type, config) {
    var trackOpts = config.trackJs || {};
    var trackConfig = trackOpts.config || {};
    var addonConfig = trackOpts.addon || defaultAddonConfig;

    var trackConfiguration = '<script type="text/javascript" id="trackjs-configuration">window._trackJs = ' + JSON.stringify(trackConfig) + ';</script>';
    var trackBoilerPlate = '<script type="text/javascript" id="trackjs-boilerplate" src="' + addonConfig.url + '" crossorigin="anonymous"></script>';

    if (type === 'head') {
      return [trackConfiguration, trackBoilerPlate].join('\n');
    }
  }
};
