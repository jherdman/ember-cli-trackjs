import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | bootstrap', function (hooks) {
  setup(hooks);

  test('it works', async function (assert) {
    let { statusCode } = await visit('/');

    assert.strictEqual(statusCode, 200);
  });
});
