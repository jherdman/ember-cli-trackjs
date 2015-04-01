import Ember from 'ember';

export function initialize(container, application) {
  let trackJs = container.lookup('service:trackjs');

  // http://docs.trackjs.com/Examples/Integrating_with_Ember
  Ember.onerror = function (err) {
    trackJs.track(err);
    Ember.Logger.assert(false, err);
  };

  Ember.RSVP.on('error', function (err) {
    trackJs.track(err);
    Ember.Logger.assert(false, err);
  });
}

export default {
  name: 'bootstrap-trackjs',
  initialize: initialize
};
