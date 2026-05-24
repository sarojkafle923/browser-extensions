# JSON Prettifier

A Firefox WebExtension that automatically detects raw JSON pages and replaces the browser's default plain-text rendering with indented, syntax-highlighted JSON.

## What it does

When you open a URL that returns a raw JSON document — a local API endpoint, a public REST API, or a `.json` file — the extension silently reformats the page body on load. No button to click, no configuration required.

**Before:** a wall of minified or unformatted text.  
**After:** indented JSON with colour-coded keys, strings, numbers, booleans, and null values.

Works on all URLs including `localhost`.

## Installation (Firefox)

1. Open `about:debugging` in Firefox
2. Click **This Firefox**
3. Click **Load Temporary Add-on**
4. Select `json-prettifier/manifest.json`

The extension is active immediately and stays loaded until Firefox is closed.

> To reload after editing source files, click **Reload** next to the extension in `about:debugging`.

## Running tests

Requires Node 18 or later. No additional dependencies.

```bash
node --test json-prettifier/tests/*.test.js
```

Expected output: 13 passing tests across Detector, Formatter, and Highlighter.

## File structure

```
json-prettifier/
├── manifest.json          ← MV3 extension manifest
├── content.js             ← entry point — orchestrates the three modules
├── style.css              ← dark theme, monospace font, token colours
├── modules/
│   ├── detector.js        ← isRawJsonPage(document) → { detected, value }
│   ├── formatter.js       ← formatJson(value) → string
│   └── highlighter.js     ← highlight(jsonString) → htmlString
└── tests/
    ├── detector.test.js
    ├── formatter.test.js
    └── highlighter.test.js
```

## How it works

The extension injects `content.js` into every page at `document_end`. The script:

1. **Detects** — tries `JSON.parse(document.body.innerText)`. If it fails, the page is not JSON and the script exits immediately.
2. **Formats** — passes the parsed value through `JSON.stringify(value, null, 2)` for consistent two-space indentation.
3. **Highlights** — runs a single regex pass over the formatted string, wrapping tokens in `<span>` elements with CSS classes.
4. **Renders** — replaces the page body with a `<pre>` element containing the highlighted HTML.

## Token colour classes

| Class | Token type | Default colour |
|---|---|---|
| `.json-key` | Object keys | Blue (`#9cdcfe`) |
| `.json-string` | String values | Orange (`#ce9178`) |
| `.json-number` | Numbers | Green (`#b5cea8`) |
| `.json-boolean` | `true` / `false` | Blue (`#569cd6`) |
| `.json-null` | `null` | Blue (`#569cd6`) |

Colours can be customised by editing `style.css`.

## Design decisions

- **No toggle back to raw** — use `Ctrl+U` (View Source) if you need the original.
- **No third-party libraries** — zero dependencies, no build step.
- **XSS-safe** — HTML entities (`<`, `>`, `&`) in JSON string values are escaped before injection into `innerHTML`.

See [ADR 0001](../docs/adr/0001-dual-mode-modules-for-node-testability.md) for the module testability pattern.

## Out of scope (v1)

Collapsible tree view, toggle to raw, JSONP, cross-browser support, user configuration.
