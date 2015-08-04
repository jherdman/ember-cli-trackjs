import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import sinon from 'sinon';

var application;
var trackSpy;

// You'll have to manually sync this with the config found in the dummy app
var dummyConfig = {
  trackJs: {
    config: {
      token: 'fake-token'
    }
  }
};

module('Acceptance: Bootstrapping Works', {
  beforeEach: function() {
    application = startApp();

    trackSpy = sinon.spy(window.trackJs, 'track');
  },

  afterEach: function() {
    Ember.run(application, 'destroy');

    window.trackJs.track.restore();

    trackSpy = null;
  }
});

// FIXME Get this to work. It seems like the acceptance tests aren't working correctly
//
//test('configuration tag is before library inclusion tag', function(assert) {
//  assert.expect(1);
//
//  visit('/');
//
//  andThen(function() {
//    var scriptTags = find('script');
//    var isFound = !!find('script#trackjs-configuration + script#trackjs-boilerplate').length;
//
//    assert.ok(isFound, 'should be found');
//  });
//});
//
//test('points to the correct URL', function(assert) {
//  assert.expect(1);
//
//  visit('/');
//
//  andThen(function() {
//    var actualUrl = find('#trackjs-boilerplate').attr('src');
//    var expectedUrl = dummyConfig.trackJs.addon.url;
//
//    assert.equal(actualUrl, expectedUrl);
//  });
//});

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
