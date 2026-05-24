# Project Context

## What this project is

A series of Firefox browser extensions built as a developer learning project. The first extension is a JSON Prettifier that auto-detects raw JSON pages and reformats them with syntax highlighting.

## Stack

- **Type:** Browser extension
- **Target browser:** Firefox
- **Manifest version:** MV3 (Manifest V3)
- **Language:** Vanilla JavaScript — no framework, no bundler, no build step
- **Styling:** Plain CSS
- **Test runner:** `node --test` (Node.js built-in, Node 18+) — no additional dependencies

## Extension inventory

| Name | Status | Description |
|---|---|---|
| json-prettifier | Shipped | Auto-formats raw JSON pages with hand-rolled syntax highlighting |

## Conventions

- Each extension lives in its own subdirectory (e.g. `json-prettifier/`)
- No shared build tooling until complexity demands it
- Load extensions in Firefox via `about:debugging > This Firefox > Load Temporary Add-on`
