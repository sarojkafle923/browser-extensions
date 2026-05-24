const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isRawJsonPage } = require('../modules/detector.js');

test('detects a page with application/json content type', () => {
  const doc = {
    contentType: 'application/json',
    body: { innerText: '{"name":"Alice"}' }
  };
  const result = isRawJsonPage(doc);
  assert.equal(result.detected, true);
  assert.deepEqual(result.value, { name: 'Alice' });
});

test('detects a page with valid JSON body and no content type', () => {
  const doc = {
    contentType: 'text/plain',
    body: { innerText: '[1, 2, 3]' }
  };
  const result = isRawJsonPage(doc);
  assert.equal(result.detected, true);
  assert.deepEqual(result.value, [1, 2, 3]);
});

test('does not detect a plain HTML page', () => {
  const doc = {
    contentType: 'text/html',
    body: { innerText: '<html><body>Hello</body></html>' }
  };
  const result = isRawJsonPage(doc);
  assert.equal(result.detected, false);
});

test('does not detect a page with invalid JSON body', () => {
  const doc = {
    contentType: 'text/plain',
    body: { innerText: 'not json at all {' }
  };
  const result = isRawJsonPage(doc);
  assert.equal(result.detected, false);
});
