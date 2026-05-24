const { test } = require('node:test');
const assert = require('node:assert/strict');
const { buildViewerHTML } = require('../modules/viewer.js');

test('output contains a json-prettifier-viewer container', () => {
  const result = buildViewerHTML('https://example.com', '{}');
  assert.ok(result.includes('class="json-prettifier-viewer"'), result);
});

test('output contains a jpv-tree mount div inside the container', () => {
  const result = buildViewerHTML('https://example.com', '{}');
  assert.ok(result.includes('class="jpv-tree"'), result);
  assert.ok(result.indexOf('jpv-tree') > result.indexOf('json-prettifier-viewer'), result);
});
