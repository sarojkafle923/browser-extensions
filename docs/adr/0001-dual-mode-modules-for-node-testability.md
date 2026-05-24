# 0001 — Dual-mode modules for zero-bundler Node testability

## Status

Accepted

## Context

The JSON Prettifier extension has three pure-logic modules (Detector, Formatter, Highlighter) that need unit tests. The extension has a hard constraint: zero external dependencies and no build step — files load directly in Firefox via `about:debugging`.

This creates a tension: browser content scripts have no `import`/`require` mechanism, but Node's test runner needs to import modules to test them.

Two alternatives were considered:

- **Bundler (esbuild, Webpack)** — adds a build step, contradicts the zero-dependency constraint, and introduces tooling complexity inappropriate for a first-extension learning project.
- **ES modules with `"type": "module"`** — Firefox MV3 supports `type: module` in content scripts, but Node requires `--experimental-vm-modules` or `.mjs` extensions to test them, adding invisible complexity.

## Decision

Each module file exports via a CommonJS guard at the bottom:

```js
if (typeof module !== 'undefined') module.exports = { fnName };
```

The manifest lists module files before `content.js` in `content_scripts.js` so their functions are available as globals in the browser. In Node, `require()` picks up the exports normally. The guard is a no-op in the browser where `module` is `undefined`.

## Consequences

- **Test files use plain `require()`** — no flags, no `.mjs`, no config.
- **Module files must contain only pure logic** — no `document`, `window`, or browser globals. Those belong in `content.js` which is never `require()`d.
- **Switching to a bundler later invalidates this pattern** — if a future extension needs a build step, this guard can be removed and replaced with standard ES module `export`.
