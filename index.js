/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-trackjs',

  contentFor: function (type, config) {
    var trackConfig = config.trackJs || {};
    var defaultURL = "//d2zah9y47r7bi2.cloudfront.net/releases/current/tracker.js";
    var targetURL = trackConfig.url || defaultURL;

    if (type === 'head') {
      return '<script type="text/javascript" id="trackjs-boilerplate" src="' + targetURL + '" crossorigin="anonymous"></script>';
    }
  }
};
