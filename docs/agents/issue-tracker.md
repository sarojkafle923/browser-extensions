# Issue Tracker — GitHub

Issues live in GitHub Issues on `sarojkafle923/browser-extensions`.

## CLI

Use the `gh` CLI for all issue operations:

```bash
gh issue list
gh issue create --title "..." --body "..." --label "needs-triage"
gh issue view <number>
gh issue edit <number> --add-label "ready-for-agent"
gh issue close <number>
```

## Conventions

- Every new issue gets the `needs-triage` label on creation.
- PRD documents go in the issue body using the standard PRD template.
- One issue per extension feature or bug — no bundling unrelated work.
