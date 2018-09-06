import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

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

module('service:trackjs', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    window.trackJs = fakeTrackJs;
  });

  hooks.afterEach(function() {
    window.trackJs = undefined;
  });

  test('method proxying', function(assert) {
    let ret = this.owner.lookup('service:trackjs').track();
    assert.equal(ret, 'called it!');
  });

  test('it proxies addMetadata to window.trackJs', function(assert) {
    let ret = this.owner.lookup('service:trackjs').addMetadata('add', 'custommetadata');
    assert.equal(ret, 'addcustommetadata');
  });

  test('it proxies removeMetadata to window.trackJs', function(assert) {
    let ret = this.owner.lookup('service:trackjs').removeMetadata('removecustommetadata');
    assert.equal(ret, 'removecustommetadata');
  });
});
