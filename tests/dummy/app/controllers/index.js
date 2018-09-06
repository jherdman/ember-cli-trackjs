import Controller from '@ember/controller';
import { on as upon } from '@ember/object/evented';

export default Controller.extend({
  testService: upon('init', function() {
    this.trackjs.track('controller error');
  })
});
