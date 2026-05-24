const { test } = require('node:test');
const assert = require('node:assert/strict');
const { buildViewerHTML } = require('../modules/viewer.js');

test('output contains a json-prettifier-viewer container', () => {
  const result = buildViewerHTML('<span>test</span>');
  assert.ok(result.includes('class="json-prettifier-viewer"'), result);
});

test('output contains a pre element inside the container', () => {
  const result = buildViewerHTML('<span>test</span>');
  assert.ok(result.includes('<pre>') && result.includes('</pre>'), result);
  assert.ok(result.indexOf('<pre>') > result.indexOf('json-prettifier-viewer'), result);
});

test('highlighted HTML content appears inside the pre element', () => {
  const html = '<span class="json-key">"name":</span> <span class="json-string">"Alice"</span>';
  const result = buildViewerHTML(html);
  const preStart = result.indexOf('<pre>') + '<pre>'.length;
  const preEnd = result.indexOf('</pre>');
  const preContent = result.slice(preStart, preEnd);
  assert.equal(preContent, html);
});
