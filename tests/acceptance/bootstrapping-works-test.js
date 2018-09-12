import { visit } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import sinon from 'sinon';

let trackSpy;

// You'll have to manually sync this with the config found in the dummy app
const dummyConfig = {
  trackJs: {
    config: {
      token: 'fake-token'
    }
  }
};

module('Acceptance: Bootstrapping Works', function(hooks) {
  setupApplicationTest(hooks);

  module('import smoke test', function() {
    test('it works', function(assert) {
      assert.ok(window.trackJs.version);
    });
  });

  module('service tests', function(hooks) {
    hooks.beforeEach(function() {
      trackSpy = sinon.spy(window.trackJs, 'track');
    });

    hooks.afterEach(function() {
      run(window.trackJs.track, 'restore');
      trackSpy = null;
    });

    test('configuration works', async function(assert) {
      assert.expect(1);

      await visit('/');

      let actualConfiguration = window._trackJs;
      let expectedConfiguraiton = dummyConfig.trackJs.config;

      assert.deepEqual(actualConfiguration, expectedConfiguraiton);
    });

    test('exposes a service on routes', async function(assert) {
      assert.expect(1);

      await visit('/');

      assert.ok(trackSpy.withArgs('route error').calledOnce);
    });

    test('exposes a service on controllers', async function(assert) {
      assert.expect(1);

      await visit('/');

      assert.ok(trackSpy.withArgs('controller error').calledOnce);
    });
  });
});
