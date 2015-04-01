import Ember from 'ember';

export function initialize(container, application) {
  let trackJs = container.lookup('service:trackjs');

  // Your TrackJS configuration here!
  trackJs.configure({
    enabled: true
  });
};

export default {
  name: 'configure-trackjs',
  initialize: initialize,
  after: 'set-up-trackjs-service'
};
