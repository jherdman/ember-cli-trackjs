import Ember from 'ember';

var upon = Ember.on;

export default Ember.Controller.extend({
  testService: upon('init', function() {
    this.trackjs.track('controller error');
  })
});
