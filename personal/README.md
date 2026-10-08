# Personal Records & Knowledge Vault

This directory organizes personal notes, technical journals, career portfolio assets, and documentation.

## Directory Structure

```
personal/
├── notes/         # Public technical notes, articles, learnings, and writeups (.md)
├── projects/      # Engineering writeups, ADRs, postmortems for ~/Projects and ~/websites
├── profile/       # Career milestones, resume highlights, project showcases (.md)
├── snippets/      # Useful command cheatsheets, dotfile snippets, configs (.md)
└── private/       # LOCAL ONLY (ignored by git). Private notes, sensitive logs, drafts
```

## Security & Privacy Guardrails
- Files placed inside `personal/private/` or named with `*.private.md`, `*.secret.md`, `*.draft.md` are **strictly ignored by git** via `.gitignore`.
- Always verify sensitive information (API keys, personal contact info, passwords) is never committed to public branches.
