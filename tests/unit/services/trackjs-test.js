import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import { TrackJS } from 'trackjs';

let sandbox = null;

module('Unit | Service | trackjs', function (hooks) {
  hooks.beforeEach(function () {
    sandbox = sinon.createSandbox();
    sandbox.spy(TrackJS);
  });

  hooks.afterEach(function () {
    sandbox.restore();
    sandbox = null;
  });

  setupTest(hooks);

  test('it returns version', async function (assert) {
    assert.strictEqual(
      this.owner.lookup('service:trackjs').version,
      TrackJS.version
    );
  });

  test('it proxies track to TrackJS', function (assert) {
    this.owner.lookup('service:trackjs').track('error');

    assert.true(TrackJS.track.calledOnce);
    assert.deepEqual(TrackJS.track.getCall(0).args, ['error']);
  });

  test('it proxies configure to TrackJS', function (assert) {
    this.owner.lookup('service:trackjs').configure('options');

    assert.true(TrackJS.configure.calledOnce);
    assert.deepEqual(TrackJS.configure.getCall(0).args, ['options']);
  });

  test('it proxies watch to TrackJS', function (assert) {
    this.owner.lookup('service:trackjs').watch('method', 'context');

    assert.true(TrackJS.watch.calledOnce);
    assert.deepEqual(TrackJS.watch.getCall(0).args, ['method', 'context']);
  });

  test('it proxies watchAll to TrackJS', function (assert) {
    this.owner.lookup('service:trackjs').watchAll('object');

    assert.true(TrackJS.watchAll.calledOnce);
    assert.deepEqual(TrackJS.watchAll.getCall(0).args, ['object']);
  });

  test('it proxies addMetadata to TrackJS', function (assert) {
    this.owner.lookup('service:trackjs').addMetadata('key', 'value');

    assert.true(TrackJS.addMetadata.calledOnce);
    assert.deepEqual(TrackJS.addMetadata.getCall(0).args, ['key', 'value']);
  });

  test('it proxies removeMetadata to TrackJS', function (assert) {
    this.owner.lookup('service:trackjs').removeMetadata('key');

    assert.true(TrackJS.removeMetadata.calledOnce);
    assert.deepEqual(TrackJS.removeMetadata.getCall(0).args, ['key']);
  });
});
