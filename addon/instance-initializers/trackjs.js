import Ember from 'ember';
import ErrorHandler from 'ember-cli-trackjs/utils/error-handler';

export function initialize(appInstance) {
  if (typeof FastBoot !== 'undefined') {
    return;
  }

  const config = appInstance.resolveRegistration('config:environment');
  const trackjs = appInstance.lookup('service:trackjs');

  let options = { ...config.trackjs };

  options.application = options.application || config.APP.name;
  options.version = options.version || config.APP.version;

  trackjs.install(options);

  // Guard against Ember.onerror hiding test failures
  // http://raytiley.com/posts/ember-onerror-troll
  if (Ember.testing) {
    return;
  }

  const handler = new ErrorHandler(trackjs);
  Ember.onerror = handler.report.bind(handler);
}

export default {
  initialize,
};
