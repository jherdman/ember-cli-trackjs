'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const path = require('path');

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

  treeForVendor(defaultTree) {
    let trees = [];

		if (defaultTree) {
			trees.push(defaultTree);
    }
    const trackjsPath = path.join(this.project.root, 'node_modules', 'trackjs')
    
    const browserVendorLib = fastbootTransform(
      new Funnel(trackjsPath, {
        files: ["tracker.js"],
        destDir: "trackjs"
      })
    );
  
    trees.push(browserVendorLib);
    
    return mergeTrees(trees);
  },

  included(app) {
    this._super.included.apply(this, arguments);

    // allow addon to be nested - see: https://github.com/ember-cli/ember-cli/issues/3718
    while (app.app) {
      app = app.app;
    }

    app.import(`${this.treePaths.vendor}/trackjs/tracker.js`);
  }
};
