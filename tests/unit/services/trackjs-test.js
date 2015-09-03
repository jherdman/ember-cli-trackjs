import {
  moduleFor,
  test
} from 'ember-qunit';

let fakeTrackJs = {
  version: '1.2.3',

  track() {
    return 'called it!';
  },
};

moduleFor('service:trackjs', {
  beforeEach() {
    window.trackJs = fakeTrackJs;
  },

  afterEach() {
    window.trackJs = undefined;
  }
});

test('method proxying', function(assert) {
  let ret = this.subject().track();
  assert.equal(ret, 'called it!');
});
