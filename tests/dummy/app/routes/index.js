import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    this.trackjs.track('route error');
  }
});
