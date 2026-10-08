---
name: personal-doc-curator
description: Standardized workflow for authoring, categorizing, and publishing personal notes and records.
---

# Personal Document Curator Skill

Use this workflow when creating, editing, or indexing personal markdown records:

1. **Classify Document Scope**:
   - Technical article or study notes -> `personal/notes/<topic>.md`.
   - Career achievements, bio updates, or talks -> `personal/profile/<topic>.md`.
   - Developer command cheatsheets, dotfiles -> `personal/snippets/<topic>.md`.
   - Private/confidential notes -> `personal/private/<topic>.md` (ignored by git).
2. **Apply Structured Format & Mandatory Frontmatter**:
   - Begin with YAML frontmatter containing `title`, `description`, `date`, and `tags`.
   - Never omit `title` or `description`.
   - Use descriptive headings (`## Overview`, `## Implementation`, `## References`).
   - Include copyable code blocks with language identifiers.
3. **Privacy Pre-Check**:
   - Verify document contains no passwords, server IPs with credentials, or personal keys.
   - If document is draft-only, suffix filename with `.draft.md`.
4. **Index Reference**:
   - Add a brief bullet point to the parent directory's `README.md` if the note is a landmark guide.
