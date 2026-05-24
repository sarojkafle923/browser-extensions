# 0002 — Tree Builder / Tree Renderer split for browser-DOM testability

## Status

Accepted

## Context

The Collapsible Tree View feature required a pipeline that walks parsed JSON recursively, classifies node types, computes child counts, and assigns depth-based collapse states — then produces live interactive DOM. This logic is complex enough to have real edge cases (empty collections, root primitives, mixed depths, nested arrays of objects).

The constraint from ADR 0001 still applies: zero external dependencies, no bundler, no jsdom. `node --test` is the only available test runner, and Node.js has no DOM.

A single "render the tree" module would mix pure recursive logic (testable in Node) with DOM operations (not testable in Node without a polyfill). Shipping untested recursive traversal logic was the risk to avoid.

## Decision

Split the rendering pipeline into two modules with distinct testability contracts:

**Tree Builder (`tree-builder.js`)** — Dual-Mode (ADR 0001). Takes a parsed JSON value, walks it recursively, and returns a plain JavaScript data structure — no DOM dependency. Each node carries: type, value, children, childCount, and collapsed (true when depth > 1). All complex logic lives here. Unit-tested in `tree-builder.test.js`.

**Tree Renderer (`tree-renderer.js`)** — Browser-only. Consumes the Tree Builder's plain tree and produces DOM nodes. Handles CSS class assignment, toggle arrow creation, click handler wiring, and `collapsed` class toggling. Kept intentionally thin so it contains no testable logic of its own.

The Searcher (`searcher.js`) follows the same principle: DOM traversal only, browser-only, kept thin. The matching logic (`text.includes(query)`) is too trivial to warrant extraction into a Dual-Mode module.

## Consequences

- All recursive logic with edge cases is covered by automated unit tests via `tree-builder.test.js`.
- Tree Renderer and Searcher have no unit tests — their correctness is verified by the Firefox smoke test.
- The Tree Builder's output contract (plain JS objects, no DOM references) is the seam between the testable and browser-only worlds. Storing DOM references in the tree would make Tree Builder non-testable in Node.
- Any significant new logic added to Tree Renderer or Searcher should prompt the question: "should this live in Tree Builder instead?"
