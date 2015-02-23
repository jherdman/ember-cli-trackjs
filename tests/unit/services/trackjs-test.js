import {
  moduleFor,
  test
} from 'ember-qunit';

var fakeTrackJs = {
  version: '1.2.3',

  track: function () {
    return 'called it!';
  },
};

moduleFor('service:trackjs', {
  beforeEach: function() {
    window.trackJs = fakeTrackJs;
  },

  afterEach: function() {
    window.trackJs = undefined;
  }
});

test('method proxying', function(assert) {
  var ret = this.subject().track();
  assert.equal(ret, 'called it!');
});
