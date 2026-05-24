const { test } = require('node:test');
const assert = require('node:assert/strict');
const { formatByteSize, buildViewerHTML } = require('../modules/viewer.js');

test('formatByteSize returns bytes for values under 1 KB', () => {
  assert.equal(formatByteSize(0), '0 B');
  assert.equal(formatByteSize(512), '512 B');
  assert.equal(formatByteSize(1023), '1023 B');
});

test('formatByteSize returns KB for kilobyte range', () => {
  assert.equal(formatByteSize(1024), '1.0 KB');
  assert.equal(formatByteSize(4300), '4.2 KB');
  assert.equal(formatByteSize(1023 * 1024), '1023.0 KB');
});

test('formatByteSize returns MB for megabyte range', () => {
  assert.equal(formatByteSize(1024 * 1024), '1.0 MB');
  assert.equal(formatByteSize(2.5 * 1024 * 1024), '2.5 MB');
});

test('buildViewerHTML output contains a toolbar element', () => {
  const result = buildViewerHTML('<span>json</span>', 'https://example.com/api', '{"a":1}');
  assert.ok(result.includes('class="jpv-toolbar"'), result);
});

test('toolbar contains the URL', () => {
  const result = buildViewerHTML('<span>json</span>', 'https://api.github.com/users/octocat', '{}');
  assert.ok(result.includes('https://api.github.com/users/octocat'), result);
});

test('toolbar contains the formatted byte size', () => {
  const formattedJson = '{\n  "name": "Alice"\n}';
  const result = buildViewerHTML('<span>json</span>', 'https://example.com', formattedJson);
  assert.ok(result.includes(formatByteSize(formattedJson.length)), result);
});

test('toolbar contains a Copy button', () => {
  const result = buildViewerHTML('<span>json</span>', 'https://example.com', '{}');
  assert.ok(result.includes('class="jpv-copy"'), result);
  assert.ok(result.includes('Copy'), result);
});
