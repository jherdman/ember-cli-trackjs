import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service trackjs;

  init() {
    super.init(...arguments);
    this.trackjs.track('controller error');
  }
}
