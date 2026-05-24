const { test } = require('node:test');
const assert = require('node:assert/strict');
const { highlight } = require('../modules/highlighter.js');

test('wraps string values in .json-string spans', () => {
  const result = highlight('"hello"');
  assert.ok(result.includes('<span class="json-string">"hello"</span>'), result);
});

test('wraps object keys in .json-key spans', () => {
  const result = highlight('"name":');
  assert.ok(result.includes('<span class="json-key">"name":</span>'), result);
});

test('wraps true and false in .json-boolean spans', () => {
  const resultTrue = highlight('true');
  const resultFalse = highlight('false');
  assert.ok(resultTrue.includes('<span class="json-boolean">true</span>'), resultTrue);
  assert.ok(resultFalse.includes('<span class="json-boolean">false</span>'), resultFalse);
});

test('wraps null in .json-null spans', () => {
  const result = highlight('null');
  assert.ok(result.includes('<span class="json-null">null</span>'), result);
});

test('wraps numbers in .json-number spans', () => {
  const result = highlight('42');
  assert.ok(result.includes('<span class="json-number">42</span>'), result);
});

test('does not produce unescaped < or > outside span tags (XSS safety)', () => {
  const input = '{"key": "<script>alert(1)</script>"}';
  const result = highlight(input);
  const stripped = result.replace(/<span[^>]*>|<\/span>/g, '');
  assert.ok(!stripped.includes('<'), `unescaped < found outside spans:\n${stripped}`);
  assert.ok(!stripped.includes('>'), `unescaped > found outside spans:\n${stripped}`);
});
