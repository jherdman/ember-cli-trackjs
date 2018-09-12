/* eslint-disable no-console */

import { assign } from '@ember/polyfills';

window.trackJs = {
  configure(newOpts) {
    console.log("Configuring");

    var originalOpts = window._trackJs;
    var modifiedOpts = assign(originalOpts, newOpts);

    window._trackJs = modifiedOpts;
  },

  _errors: [],

  track(errorOrString) {
    console.error(errorOrString);
    this._errors.push(errorOrString);
  },

  _reset() { this.errors = []; },

  attempt() { console.log("Attempting"); },

  watch() { console.log("Watching"); },

  watchAll() { console.log("Watching all"); }
};
