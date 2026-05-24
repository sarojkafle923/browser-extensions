# Domain Docs

Single-context layout.

## Files

- `CONTEXT.md` — domain glossary at repo root. Canonical source for all domain terms.
- `docs/adr/` — Architecture Decision Records for hard, surprising, trade-off decisions.

## Rules for agents

- Always read `CONTEXT.md` before using domain terms. If a term you need isn't there, propose it to the user before using it.
- Never put implementation details in `CONTEXT.md` — it is a glossary only.
- Propose an ADR only when a decision is hard to reverse, surprising without context, and the result of a real trade-off.
- ADR filenames: `docs/adr/NNNN-short-title.md` (zero-padded four digits).
