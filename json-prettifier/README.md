# JSON Prettifier

A Firefox WebExtension that automatically detects raw JSON pages and replaces the browser's default plain-text rendering with an interactive, collapsible JSON Tree with syntax highlighting.

## What it does

When you open a URL that returns a raw JSON document — a local API endpoint, a public REST API, or a `.json` file — the extension silently reformats the page on load. No button to click, no configuration required.

**Before:** a wall of minified or unformatted text.  
**After:** an interactive JSON Tree. Root and top-level keys expand automatically; deeper nodes start collapsed with a summary (`{ N }` for objects, `[ N ]` for arrays). Click `▶`/`▼` to expand or collapse any node.

A toolbar pinned at the top shows the page URL, JSON size, a Copy button (always copies the full JSON regardless of collapse state), and a search field that highlights matching tokens and auto-expands any collapsed ancestors containing a match.

Works on all URLs including `localhost`.

## Installation (Firefox)

1. Open `about:debugging` in Firefox
2. Click **This Firefox**
3. Click **Load Temporary Add-on**
4. Select `json-prettifier/manifest.json`

The extension stays loaded until Firefox is closed. Click **Reload** in `about:debugging` after editing source files.

## Running tests

Requires Node 18 or later. No additional dependencies.

```bash
node --test json-prettifier/tests/*.test.js
```

Expected output: 27 passing tests across Detector, Formatter, Tree Builder, Viewer, Toolbar, and Manifest.

## File structure

```
json-prettifier/
├── manifest.json          ← MV3 extension manifest
├── content.js             ← entry point — orchestrates the pipeline
├── style.css              ← dark theme, token colours, collapse/expand rules
├── modules/
│   ├── detector.js        ← isRawJsonPage(document) → { detected, value }
│   ├── formatter.js       ← formatJson(value) → string  (used by Copy button)
│   ├── tree-builder.js    ← buildTree(value) → plain tree data structure  (Dual-Mode)
│   ├── tree-renderer.js   ← renderTree(node) → DOM element  (browser-only)
│   ├── viewer.js          ← buildViewerHTML(url, formattedJson) → HTML string
│   └── searcher.js        ← applySearch(root, query) → void  (browser-only)
└── tests/
    ├── detector.test.js
    ├── formatter.test.js
    ├── tree-builder.test.js
    ├── viewer.test.js
    ├── toolbar.test.js
    └── manifest.test.js
```

## How it works

`content.js` is injected into every page at `document_end`:

1. **Detects** — `isRawJsonPage(document)` tries `JSON.parse(document.body.innerText)`. If it fails, the script exits immediately.
2. **Formats** — `formatJson(result.value)` produces the full formatted JSON string used by the Copy button.
3. **Builds the tree** — `buildTree(result.value)` walks the parsed value recursively and returns a plain data structure: each node carries its type, value, children, child count, and initial collapse state (root and depth-1 always open; depth-2+ start collapsed).
4. **Renders** — `renderTree(tree)` produces live DOM nodes with `▶`/`▼` toggle arrows and click handlers that toggle a `collapsed` CSS class.
5. **Mounts** — the tree is appended to the `<div class="jpv-tree">` mount point inside the viewer HTML.

Search fires on every input event: `applySearch(treeEl, query)` traverses all token spans, adds `.jpv-highlight` to matches (case-insensitive), and removes `.collapsed` from any ancestor nodes of a match.

## Token colour classes

| Class | Token type | Colour |
|---|---|---|
| `.json-key` | Object keys | Blue (`#9cdcfe`) |
| `.json-string` | String values | Orange (`#ce9178`) |
| `.json-number` | Numbers | Green (`#b5cea8`) |
| `.json-boolean` | `true` / `false` | Blue (`#569cd6`) |
| `.json-null` | `null` | Blue (`#569cd6`) |

## Design decisions

- **No toggle back to raw** — `Ctrl+U` (View Source) if you need the original.
- **No third-party libraries** — zero dependencies, no build step.
- **Tree Builder is Dual-Mode; Tree Renderer is browser-only** — pure recursive logic lives in Tree Builder where it can be unit-tested in Node. Tree Renderer and Searcher are kept intentionally thin. See ADR 0002.
- **Copy always copies the full JSON** — `formatJson` runs independently of the tree pipeline. Collapse state never silently truncates what is copied.
- **`textContent` for all rendering** — DOM nodes are built with `createElement` and `.textContent`, eliminating XSS risk from JSON string values.

See [ADR 0001](../docs/adr/0001-dual-mode-modules-for-node-testability.md) and [ADR 0002](../docs/adr/0002-tree-builder-renderer-testability-split.md).

## Out of scope

Expand-all / collapse-all buttons, persisting collapse state across reloads, deep-linking to JSON paths, animated transitions, toggle to raw, JSONP, cross-browser support, user configuration.
