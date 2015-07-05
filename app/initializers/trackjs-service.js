export function initialize(container, application) {
  application.inject('route', 'trackjs', 'service:trackjs');
  application.inject('controller', 'trackjs', 'service:trackjs');
}

export default {
  name: 'trackjs-service',
  initialize: initialize
};
