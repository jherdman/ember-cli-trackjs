/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-trackjs',

  contentFor: function (type, config) {
    var defaultUrl = "//d2zah9y47r7bi2.cloudfront.net/releases/current/tracker.js";
    var trackOpts = config.trackJs || {};

    var trackToken = trackOpts.token;
    var trackUrl = trackOpts.url || defaultUrl;

    var trackTag = '<script type="text/javascript" id="trackjs-boilerplate" data-token="' + trackToken + '" src="' + trackUrl + '" crossorigin="anonymous"></script>';

    if (type === 'head') {
      return trackTag;
    }
  }
};
