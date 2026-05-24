# Browser Extensions — Domain Glossary

## Extension
A Firefox WebExtension packaged as a directory containing a `manifest.json` and associated assets. Governed by the WebExtensions API spec shared between Firefox and Chrome (with minor differences).

## Manifest
The `manifest.json` file that declares an extension's identity, permissions, and entry points. Every extension has exactly one manifest. The current standard is **Manifest V3** (MV3); Firefox also supports MV2 but MV3 is the forward target.

## Content Script
A JavaScript file injected into a web page's document context by the extension. Runs in an isolated world — has access to the DOM but not to the page's own JS globals. The primary tool for reading and modifying page content.

## Background Script
A persistent (MV2) or event-driven service worker (MV3) that runs outside any page context. Handles extension lifecycle, cross-tab state, and APIs unavailable to content scripts.

## Popup
A small HTML/CSS/JS page rendered when the user clicks the extension's toolbar icon. Ephemeral — destroyed when closed.

## Raw JSON Page
A browser tab whose entire body content is a single JSON document, typically served with `Content-Type: application/json`. Common when hitting REST API endpoints or local dev servers directly in the browser.

## JSON Prettifier
The first extension in this project. A content script that auto-detects Raw JSON Pages on load, parses the JSON, re-renders the page body as indented, syntax-highlighted text, and does nothing else (no toggle back to raw, no popup UI).

## Tree Builder
A pure-logic Dual-Mode Module that walks a parsed JSON value recursively and returns a plain tree data structure (no DOM). Classifies each node by type, computes child counts, and assigns initial collapse state based on depth. Testable in Node.js via `node --test`.

## Tree Renderer
A browser-only module (not Dual-Mode) that consumes the Tree Builder's output and produces the JSON Tree DOM structure. Applies syntax colouring and toggle arrow affordances. Not unit-tested in Node — kept thin so the logic under test lives in the Tree Builder.

## JSON Tree
The interactive UI artifact rendered by the Tree Renderer in place of the former flat `<pre>` output. A nested DOM structure where each object and array node can be collapsed or expanded individually. Collapsed nodes display a summary: `{ N }` for objects (N = number of keys) and `[ N ]` for arrays (N = number of items).

## Host Permission
A manifest declaration that grants an extension access to pages matching a URL pattern. Required for content scripts to run on a given origin.

## Pretty Viewer
The full UI that the JSON Prettifier renders in place of a Raw JSON Page. Composed of a Viewer Toolbar pinned at the top and a full-width JSON content area below it.

## Viewer Toolbar
The persistent bar pinned at the top of the Pretty Viewer. Contains: the page URL, JSON size metadata, a Copy button (copies formatted JSON to clipboard), and a Search Input.

## Search Highlight
The visual emphasis applied to JSON tokens — both keys and values — that match the current Search Input query. Rendered as a background colour over the matched token, distinct from the token's syntax colour class.

## Search Input
The text field in the Viewer Toolbar. On input, triggers a Search Highlight pass over all visible JSON tokens matching the query (case-insensitive, keys and values).

## Dual-Mode Module
A JavaScript module file that works both as a browser content script and as a Node.js `require()`-able module — without a bundler. Achieved by ending the file with `if (typeof module !== 'undefined') module.exports = { ... }`. The guard is a no-op in the browser. Used to enable `node --test` unit testing of pure-logic modules. See ADR 0001.
