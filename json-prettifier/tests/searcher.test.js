const { test } = require('node:test');
const assert = require('node:assert/strict');
const { applySearchHighlight } = require('../modules/searcher.js');

test('returns original HTML unchanged when query is empty', () => {
  const html = '<span class="json-key">"name":</span> <span class="json-string">"Alice"</span>';
  assert.equal(applySearchHighlight(html, ''), html);
  assert.equal(applySearchHighlight(html, null), html);
});

test('adds jpv-highlight class to spans whose text contains the query', () => {
  const html = '<span class="json-key">"userId":</span> <span class="json-number">42</span>';
  const result = applySearchHighlight(html, 'user');
  assert.ok(result.includes('class="json-key jpv-highlight"'), result);
});

test('does not modify spans whose text does not match the query', () => {
  const html = '<span class="json-key">"userId":</span> <span class="json-number">42</span>';
  const result = applySearchHighlight(html, 'user');
  assert.ok(result.includes('class="json-number">42</span>'), result);
  assert.ok(!result.includes('class="json-number jpv-highlight"'), result);
});

test('matching is case-insensitive', () => {
  const html = '<span class="json-string">"Alice"</span>';
  assert.ok(applySearchHighlight(html, 'alice').includes('jpv-highlight'), 'lowercase query should match');
  assert.ok(applySearchHighlight(html, 'ALICE').includes('jpv-highlight'), 'uppercase query should match');
  assert.ok(applySearchHighlight(html, 'aLiCe').includes('jpv-highlight'), 'mixed case query should match');
});

test('matches inside both key and value spans', () => {
  const html = '<span class="json-key">"name":</span> <span class="json-string">"name-value"</span>';
  const result = applySearchHighlight(html, 'name');
  assert.ok(result.includes('class="json-key jpv-highlight"'), 'key span should be highlighted');
  assert.ok(result.includes('class="json-string jpv-highlight"'), 'value span should be highlighted');
});
