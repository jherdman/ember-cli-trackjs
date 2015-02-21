/**
 * Stub! This is here so that we can assert that it's working correctly. I
 * really don't want to hit the network to deal with Track's actual JS API.
 */

window.trackJs = {
  errors: [],

  track: function (errorOrString) {
    console.error(errorOrString);
    this.errors.push(errorOrString);
  }
};

window._trackJs = {};
