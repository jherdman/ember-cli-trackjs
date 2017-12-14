/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-cli-trackjs',

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

  treeForVendor(vendorTree) {
    let trees = [];
    if (vendorTree) {
      trees.push(vendorTree);
    }

    let trackjsPath = path.dirname(require.resolve('trackjs'));
    let trackerLib = new Funnel(trackjsPath, {
      destDir: 'trackjs',
      files: ['tracker.js']
    });
    trackerLib = map(
      trackerLib,
      content => `if (typeof FastBoot === 'undefined') { ${content} }`
    );
    trees.push(trackerLib);

    return new mergeTrees(trees);
  },

  included(app) {
    this._super.included(app);

    let options = app.options['ember-cli-trackjs'];
    if (!(options && options.cdn)) {
      let vendor = this.treePaths.vendor;
      app.import(vendor + '/trackjs/tracker.js');
    }
  }
};
