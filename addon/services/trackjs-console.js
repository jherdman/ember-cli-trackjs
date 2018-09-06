import Service from '@ember/service';
import { readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

// @private
export default Service.extend({
  _fastboot: computed(function() {
    let owner = getOwner(this);
    return owner.lookup('service:fastboot');
  }),

  _isFastBoot: readOnly('_fastboot.isFastBoot'),

  error() {
    return !this.get('_isFastBoot') && window.trackJs && window.trackJs.console.error.apply(window.trackJs, arguments);
  },

  info() {
    return !this.get('_isFastBoot') && window.trackJs && window.trackJs.console.info.apply(window.trackJs, arguments);
  },

  log() {
    return !this.get('_isFastBoot') && window.trackJs && window.trackJs.console.log.apply(window.trackJs, arguments);
  },
});
