import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

var fakeTrackJs = {
  errors: [],

  track: function(errorOrString) {
    console.error(errorOrString);
    this.errors.push(errorOrString);
  },

  reset: function() {
    this.errors = [];
  }
};

var fakeTrackJsConfig = {};

// You'll have to manually sync this with the config found in the dummy app
var dummyConfig = {
  trackJs: {
    url: '/fake-trackjs.js',
    token: 'fake-token'
  }
};

module('Acceptance: Bootstrapping Works', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');

    window.trackJs._reset();

    fakeTrackJsConfig = {};
  }
});

test('script tag injection works', function(assert) {
  assert.expect(2);

  visit('/');

  // womp womp...
  let scriptTag = Ember.$('#trackjs-boilerplate');

  andThen(function() {
    assert.equal(scriptTag.data('token'), dummyConfig.trackJs.token);
    assert.equal(scriptTag.attr('src'), dummyConfig.trackJs.url);
  });
});

test('configuration works', function(assert) {
  assert.expect(3);

  visit('/');

  andThen(function() {
    let actualConfig = window._trackJs;

    assert.equal(typeof actualConfig.onError, 'function');
    assert.ok(actualConfig.enabled);
    assert.equal(actualConfig.user, 'timothy');
  });
});

test('exposes a service on routes', function(assert) {
  assert.expect(1);

  visit('/');

  andThen(function() {
    let isErrorFound = window.trackJs._errors.indexOf('route error') !== -1;
    assert.ok(isErrorFound);
  });
});

test('exposes a service on controllers', function(assert) {
  assert.expect(1);

  visit('/');

  andThen(function() {
    let isErrorFound = window.trackJs._errors.indexOf('controller error') !== -1;
    assert.ok(isErrorFound);
  });
});
