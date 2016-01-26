import Ember from 'ember';

/**
 * Provides an incomplete proxy to TrackJS. This is mostly because we can't
 * seem to rely upon `window.trackJs` being initialized... Or at least I had
 * enough grief in trying to get this to work that this proxy seemed like the
 * easiest solution for now.
 */
export default Ember.Service.extend({
  track() {
    return window.trackJs && window.trackJs.track.apply(window.trackJs, arguments);
  },

  configure() {
    return window.trackJs && window.trackJs.configure.apply(window.trackJs, arguments);
  },

  attempt() {
    return window.trackJs && window.trackJs.attempt.apply(window.trackJs, arguments);
  },

  watch() {
    return window.trackJs && window.trackJs.watch.apply(window.trackJs, arguments);
  },

  watchAll() {
    return window.trackJs && window.trackJs.watchAll.apply(window.trackJs, arguments);
  },

  addMetadata() {
    return window.trackJs && window.trackJs.addMetadata.apply(window.trackJs, arguments);
  },

  removeMetadata() {
    return window.trackJs && window.trackJs.removeMetadata.apply(window.trackJs, arguments);
  },

  console: {
    error() {
      return window.trackJs && window.trackJs.console.error.apply(window.trackJs, arguments);
    },

    info() {
      return window.trackJs && window.trackJs.console.info.apply(window.trackJs, arguments);
    },

    log() {
      return window.trackJs && window.trackJs.console.log.apply(window.trackJs, arguments);
    }
  }
});
