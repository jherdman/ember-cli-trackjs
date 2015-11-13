import Ember from 'ember';

export function initialize(application) {
  let trackJs = application.container.lookup('service:trackjs');
  let appVersion = application.container.lookup('application:main').get('version');

  trackJs.configure({
    version: appVersion
  });

  // http://docs.trackjs.com/Examples/Integrating_with_Ember
  Ember.onerror = function (err) {
    if (err.name === 'TransitionError') {
      Ember.debug('Ignoring TransitionError:', err);
    } else {
      trackJs.track(err);
      Ember.Logger.assert(false, err);
    }
  };

  Ember.RSVP.on('error', function (err) {
    trackJs.track(err);
    Ember.Logger.assert(false, err);
  });
}

export default {
  name: 'configure-trackjs',
  initialize: initialize
};
