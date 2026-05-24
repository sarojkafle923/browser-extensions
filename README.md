# browser-extensions

A collection of Firefox WebExtensions built as a developer learning project. Each extension targets a real daily pain point — starting simple and growing in complexity over time.

## Why this project exists

Building extensions from scratch is the fastest way to understand the WebExtensions API: how manifests work, what content scripts can and cannot do, how permissions are scoped, and how to test browser-specific code without a bundler. Each extension here is a deliberate step up in complexity.

## Extensions

| Extension | Status | Purpose |
|---|---|---|
| [json-prettifier](./json-prettifier/) | Shipped | Auto-formats raw JSON pages with syntax highlighting |

## Running tests

Each extension has its own test suite using Node's built-in test runner (Node 18+). Run tests from the repo root:

```bash
# JSON Prettifier
node --test json-prettifier/tests/*.test.js
```

## Loading an extension in Firefox

1. Open `about:debugging` in Firefox
2. Click **This Firefox**
3. Click **Load Temporary Add-on**
4. Select the `manifest.json` inside the extension's directory

The extension stays loaded until Firefox is closed or you click **Remove**.

## Project structure

```
browser-extensions/
├── json-prettifier/   ← first extension
├── docs/
│   ├── adr/           ← architecture decision records
│   └── agents/        ← agent skill configuration
├── CLAUDE.md          ← agent skills index
└── CONTEXT.md         ← domain glossary
```

## Architecture decisions

Significant decisions are recorded in [`docs/adr/`](./docs/adr/):

- [0001 — Dual-mode modules for zero-bundler Node testability](./docs/adr/0001-dual-mode-modules-for-node-testability.md)
