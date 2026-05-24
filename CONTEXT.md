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

## Syntax Highlighter
A hand-rolled regex-based function (no third-party library) that colorizes JSON tokens — strings, numbers, booleans, null, and object keys — using `<span>` elements with distinct CSS classes.

## Host Permission
A manifest declaration that grants an extension access to pages matching a URL pattern. Required for content scripts to run on a given origin.
