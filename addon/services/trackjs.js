import Ember from 'ember';

const {
  computed,
  getOwner,
  Service,
} = Ember;

/**
 * Provides an incomplete proxy to TrackJS. This is mostly because we can't
 * seem to rely upon `window.trackJs` being initialized... Or at least I had
 * enough grief in trying to get this to work that this proxy seemed like the
 * easiest solution for now.
 */
export default Service.extend({
  _fastboot: computed(function() {
    let owner = getOwner(this);
    return owner.lookup('service:fastboot');
  }),

  _isFastBoot: computed.readOnly('_fastboot.isFastBoot'),

  track() {
    return !this.get('_isFastBoot') && window.trackJs && window.trackJs.track.apply(window.trackJs, arguments);
  },

  configure() {
    return !this.get('_isFastBoot') && window.trackJs && window.trackJs.configure.apply(window.trackJs, arguments);
  },

  attempt() {
    return !this.get('_isFastBoot') && window.trackJs && window.trackJs.attempt.apply(window.trackJs, arguments);
  },

  watch() {
    return !this.get('_isFastBoot') && window.trackJs && window.trackJs.watch.apply(window.trackJs, arguments);
  },

  watchAll() {
    return !this.get('_isFastBoot') && window.trackJs && window.trackJs.watchAll.apply(window.trackJs, arguments);
  },

  addMetadata() {
    return !this.get('_isFastBoot') && window.trackJs && window.trackJs.addMetadata.apply(window.trackJs, arguments);
  },

  removeMetadata() {
    return !this.get('_isFastBoot') && window.trackJs && window.trackJs.removeMetadata.apply(window.trackJs, arguments);
  },

  console: {
    error() {
      return !this.get('_isFastBoot') && window.trackJs && window.trackJs.console.error.apply(window.trackJs, arguments);
    },

    info() {
      return !this.get('_isFastBoot') && window.trackJs && window.trackJs.console.info.apply(window.trackJs, arguments);
    },

    log() {
      return !this.get('_isFastBoot') && window.trackJs && window.trackJs.console.log.apply(window.trackJs, arguments);
    }
  }
});
