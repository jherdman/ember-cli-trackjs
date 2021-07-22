import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import sinon from 'sinon';
import { TrackJS } from 'trackjs';

let sandbox = null;

module('Acceptance | bootstrap', function (hooks) {
  hooks.beforeEach(function () {
    sandbox = sinon.createSandbox();
    sandbox.spy(TrackJS);
  });

  hooks.afterEach(function () {
    sandbox.restore();
    sandbox = null;
  });

  setupApplicationTest(hooks);

  test('it works', async function (assert) {
    await visit('/');

    assert.true(TrackJS.install.calledOnce);
    assert.deepEqual(TrackJS.install.getCall(0).args, [
      {
        application: 'fake-application',
        token: 'fake-token',
        version: 'fake-version',
      },
    ]);

    assert.true(TrackJS.track.calledTwice);
    assert.deepEqual(TrackJS.track.getCall(0).args, ['controller error']);
    assert.deepEqual(TrackJS.track.getCall(1).args, ['route error']);

    assert.equal(TrackJS.isInstalled.callCount, 3);
  });
});
