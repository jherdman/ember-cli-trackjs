import ErrorHandler from '../../../utils/error-handler';
import { module, test } from 'qunit';

function collapseWhitespace(text) {
  return text.trim().replace(/\s{1,}/g, ' ');
}

let trackJs = {
  track(err) {
    this._errors.push(err);
  },

  reset() {
    this._errors = [];
  },

  getError(n) {
    return this._errors[n];
  },

  _errors: []
};

let handler = null;

module('Unit | Utility | error handler', {
  beforeEach() {
    handler = new ErrorHandler(trackJs);
  },

  afterEach() {
    handler = null;

    trackJs.reset();
  }
});

test('it handles error instances', function(assert) {
  handler.report(new Error('oh nose!'));

  assert.equal(trackJs.getError(0).message, 'oh nose!');
});

test('it handles POJOs', function(assert) {
  handler.report({ message: 'TransitionAborted' });

  let error = collapseWhitespace(trackJs.getError(0));

  assert.equal(error, `{ "message": "TransitionAborted" }`);
});
