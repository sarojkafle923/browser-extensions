const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const manifest = require(path.join(__dirname, '../manifest.json'));

test('content_scripts declares no global css — styles must be injected dynamically', () => {
  const script = manifest.content_scripts[0];
  assert.equal(
    script.css,
    undefined,
    'css key found in content_scripts — this injects styles on every page, not just JSON pages'
  );
});
