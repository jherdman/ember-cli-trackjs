import Ember from 'ember';

export function initialize(/* container, application */) {
  // http://docs.trackjs.com/Examples/Integrating_with_Ember
  Ember.onerror = function (err) {
    if (window.trackJs) {
      window.trackJs.track(error);
    }

    Ember.Logger.assert(false, err);
  };

  Ember.RSVP.on('error', function (err) {
    if (window.trackJs) {
      window.trackJs.track(error);
    }

    Ember.Logger.assert(false, err);
  });
}

export default {
  name: 'configure-trackjs',
  initialize: initialize
};
