import Ember from 'ember';
import ErrorHandler from '../utils/error-handler';

export function initialize(application) {
  let trackJs = application.container.lookup('service:trackjs');
  let appVersion = application.container.lookup('application:main').get('version');

  trackJs.configure({
    version: appVersion
  });

  let handler = new ErrorHandler(trackJs);

  Ember.onerror = handler.report.bind(handler);
}

export default {
  name: 'configure-trackjs',
  initialize: initialize
};
