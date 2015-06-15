import Ember from 'ember';

/**
 * Provides an incomplete proxy to TrackJS. This is mostly because we can't
 * seem to rely upon `window.trackJs` being initialized... Or at least I had
 * enough grief in trying to get this to work that this proxy seemed like the
 * easiest solution for now.
 */
export default Ember.Service.extend({
  track: function() {
    return window.trackJs && window.trackJs.track.apply(window.trackJs, arguments);
  },

  configure: function() {
    return window.trackJs && window.trackJs.configure.apply(window.trackJs, arguments);
  },

  attempt: function() {
    return window.trackJs && window.trackJs.attempt.apply(window.trackJs, arguments);
  },

  watch: function() {
    return window.trackJs && window.trackJs.watch.apply(window.trackJs, arguments);
  },

  watchAll: function() {
    return window.trackJs && window.trackJs.watchAll.apply(window.trackJs, arguments);
  }
});
