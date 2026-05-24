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

test('style.css is declared in web_accessible_resources — required for browser.runtime.getURL to resolve', () => {
  const war = manifest.web_accessible_resources;
  assert.ok(Array.isArray(war) && war.length > 0, 'web_accessible_resources missing from manifest');
  const resources = war.flatMap(entry => entry.resources || []);
  assert.ok(resources.includes('style.css'), 'style.css not listed in web_accessible_resources');
});
