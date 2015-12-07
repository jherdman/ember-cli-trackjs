export function initialize() {
  const application = arguments[1] || arguments[0];
  application.inject('route', 'trackjs', 'service:trackjs');
  application.inject('controller', 'trackjs', 'service:trackjs');
}

export default {
  name: 'trackjs-service',
  initialize: initialize
};
