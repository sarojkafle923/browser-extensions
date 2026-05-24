# Triage Labels

Five canonical roles mapped to their GitHub label strings:

| Role | Label string |
|---|---|
| needs-triage | `needs-triage` |
| needs-info | `needs-info` |
| ready-for-agent | `ready-for-agent` |
| ready-for-human | `ready-for-human` |
| wontfix | `wontfix` |

Create missing labels with:

```bash
gh label create "needs-triage" --color "#e4e669"
gh label create "needs-info" --color "#0075ca"
gh label create "ready-for-agent" --color "#6f42c1"
gh label create "ready-for-human" --color "#d93f0b"
gh label create "wontfix" --color "#ffffff"
```
