import Ember from 'ember';

export function initialize(container, application) {
  let trackJs = container.lookup('service:trackjs');

  let options = {
    enabled: true,
    user: 'timothy',
    onError: function() { console.error('Aw, snap!'); }
  };

  // Your TrackJS configuration here!
  trackJs.configure(options);
}

export default {
  name: 'configure-trackjs',
  initialize: initialize,
  after: 'set-up-trackjs-service'
};
