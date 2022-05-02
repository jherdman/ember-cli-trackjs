import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service trackjs;

  constructor() {
    super(...arguments);
    this.trackjs.track('controller error');
  }
}
