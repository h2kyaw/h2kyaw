---
description: Personal knowledge structure, taxonomy, categorization, and privacy segregation.
trigger: glob
globs: "personal/**/*.md"
---

# Personal Knowledge Base Governance & Categorization

- **Taxonomy & Folder Assignment**:
  - `personal/notes/`: Technical articles, study notes, guides, and architecture thoughts intended to be public or shareable.
  - `personal/profile/`: Extended professional biographies, public achievements, certifications, and portfolio details.
  - `personal/snippets/`: Practical command cheat sheets, shell scripts, dotfile blocks, and server setup snippets.
  - `personal/private/`: Local confidential data, private contact notes, or raw drafts (ignored by Git).
- **Strict Frontmatter Standard**: Every document in `personal/notes/`, `personal/projects/`, and `personal/snippets/` MUST begin with complete YAML frontmatter:
  ```yaml
  ---
  title: "Clear Human-Readable Title"
  description: "Accise 1-2 sentence description for listing and search cards"
  date: YYYY-MM-DD
  tags: [topic1, topic2]
  status: published # or draft
  ---
  ```
- **Never Rely on Filename as Title**: Never publish documents without an explicit, human-readable `title` in frontmatter.
- **Drafts Handling**: Work-in-progress notes that should not yet be published should end in `.draft.md` or stay within `personal/private/`.
