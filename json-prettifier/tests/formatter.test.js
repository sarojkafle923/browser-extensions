const { test } = require('node:test');
const assert = require('node:assert/strict');
const { formatJson } = require('../modules/formatter.js');

test('output is parseable JSON', () => {
  const result = formatJson({ name: 'Alice', age: 30 });
  assert.doesNotThrow(() => JSON.parse(result));
});

test('indents nested structures with two spaces', () => {
  const result = formatJson({ a: { b: 1 } });
  assert.ok(result.includes('  "b": 1'), `expected two-space indent, got:\n${result}`);
});

test('round-trips: parsed output deep-equals original input', () => {
  const input = { x: [1, true, null, 'hello'], y: { z: 42 } };
  assert.deepEqual(JSON.parse(formatJson(input)), input);
});
