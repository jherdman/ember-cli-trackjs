import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import sinon from 'sinon';

let application;
let trackSpy;

// You'll have to manually sync this with the config found in the dummy app
const dummyConfig = {
  trackJs: {
    config: {
      token: 'fake-token'
    }
  }
};

module('Acceptance: Bootstrapping Works', {
  beforeEach() {
    application = startApp();

    trackSpy = sinon.spy(window.trackJs, 'track');
  },

  afterEach() {
    Ember.run(application, 'destroy');
    Ember.run(window.trackJs.track, 'restore');

    trackSpy = null;
  }
});

test('configuration works', function(assert) {
  assert.expect(1);

  visit('/');

  andThen(function() {
    let actualConfiguration = window._trackJs;
    let expectedConfiguraiton = dummyConfig.trackJs.config;

    assert.deepEqual(actualConfiguration, expectedConfiguraiton);
  });
});

test('exposes a service on routes', function(assert) {
  assert.expect(1);

  visit('/');

  andThen(function() {
    assert.ok(trackSpy.withArgs('route error').calledOnce);
  });
});

test('exposes a service on controllers', function(assert) {
  assert.expect(1);

  visit('/');

  andThen(function() {
    assert.ok(trackSpy.withArgs('controller error').calledOnce);
  });
});
