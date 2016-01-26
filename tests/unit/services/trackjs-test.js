import {
  moduleFor,
  test
} from 'ember-qunit';

let fakeTrackJs = {
  version: '1.2.3',

  track() {
    return 'called it!';
  },

  addMetadata(key, value) {
    return key + value;
  },

  removeMetadata(key) {
    return key;
  }
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

test('it proxies addMetadata to window.trackJs', function(assert) {
  let ret = this.subject().addMetadata('add', 'custommetadata');
  assert.equal(ret, 'addcustommetadata');
});

test('it proxies removeMetadata to window.trackJs', function(assert) {
  let ret = this.subject().removeMetadata('removecustommetadata');
  assert.equal(ret, 'removecustommetadata');
});
