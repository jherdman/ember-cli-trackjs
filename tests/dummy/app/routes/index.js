import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service trackjs;

  model() {
    this.trackjs.track('route error');
  }
}
