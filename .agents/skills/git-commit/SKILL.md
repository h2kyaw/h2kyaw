---
name: git-commit
description: Enforce Conventional Commits specification, pre-commit privacy audit, and atomic staging workflow for repository changes.
---

# Git Commit Workflow & Conventional Commits Skill

This skill governs the end-to-end process of staging, verifying, and committing changes in the `h2kyaw/h2kyaw` repository, ensuring atomic commits, strict privacy shielding, and consistent Conventional Commit messages.

---

## 1. Commit Message Specification

Every commit must follow this exact format:

```text
<type>(<scope>): <imperative summary>

[optional body explaining technical decisions or rationale]

[optional footer: Co-authored-by, References, Closes #issue]
```

### Syntax & Style Constraints
- **Header Length**: Under 72 characters.
- **Mood**: Imperative present tense (`add`, `fix`, `update`, `refactor`, `clean`).
- **Punctuation**: No period at the end of the subject line.
- **Body Wrap**: Wrap body text at 72-80 characters when a body is needed.

---

## 2. Permitted Types & Scopes

### Permitted Types
- **`docs`**: Changes to documentation, markdown notes, guides, and profile README.
- **`feat`**: New features, Astro pages, UI components, or new site functionality.
- **`fix`**: Bug fixes, template corrections, action marker fixes.
- **`ci`**: GitHub Actions workflows, runner scripts, cron schedule updates.
- **`refactor`**: Code or markdown restructure without changing behavior or adding new features.
- **`chore`**: Maintenance tasks, dependencies, dotfiles, agent rules/skills, `.gitignore`.
- **`perf`**: Performance optimizations (build time, bundle size, static rendering).

### Permitted Scopes
- **`(profile)`**: Root GitHub Profile showcase (`README.md`).
- **`(notes)`**: Public technical notes in `personal/notes/`.
- **`(projects)`**: Engineering writeups and postmortems in `personal/projects/`.
- **`(snippets)`**: Practical developer scripts and cheatsheets in `personal/snippets/`.
- **`(personal)`**: Multi-category personal knowledge updates across `personal/`.
- **`(site)`**: Astro static website in `site/` (components, pages, layouts, styles).
- **`(actions)`**: Scheduled and automated GitHub Actions in `.github/`.
- **`(agents)`**: Agent rules (`.agents/rules/`) and skills (`.agents/skills/`).
- **`(config)`**: Configuration files, `.gitignore`, `.ignore`.

---

## 3. Step-by-Step Commit Runbook

### Step 1: Pre-Commit Privacy & Secrets Audit
Before staging any files, verify that no confidential files or secrets will be added:
```bash
git status --ignored -s
```
- Verify that `personal/private/` is strictly ignored.
- Confirm no `.env`, private keys (`.pem`, `.id_rsa`), tokens, or credentials are in `git status`.
- Ensure build artifacts (`site/dist/`, `site/.astro/`, `node_modules/`) are ignored.

### Step 2: Atomic Staging
Group changes into logical, cohesive units. Never stage unrelated files together:
```bash
# Example: Staging only agent rules and skills
git add .agents/ AGENTS.md

# Example: Staging only personal notes
git add personal/notes/
```

### Step 3: Verify Staged Changes
Inspect staged changes to ensure no extraneous modifications are present:
```bash
git diff --staged --stat
```

### Step 4: Commit with Conventional Format
Execute the commit with the appropriate type, scope, and imperative summary:
```bash
git commit -m "<type>(<scope>): <imperative summary>"
```

### Step 5: Post-Commit Verification
Confirm that the commit was successfully recorded and that working tree status is expected:
```bash
git log -1 --stat
```

---

## 4. Standard Repository Commit Examples

- Profile Fix:
  `fix(profile): resolve undefined commit count and preserve action anchors`
- CI Update:
  `ci(actions): update checkout action to v4 and optimize recent activity config`
- Astro Knowledge Site:
  `feat(site): initialize astro knowledge hub with iconic theme and project groups`
- Engineering Writeups:
  `docs(projects): standardize frontmatter and add 14 engineering logs`
- Automation Snippets:
  `docs(snippets): add authentic devops and system automation scripts`
- Technical Notes:
  `docs(notes): curate production architecture notes and guides`
- Agent Governance:
  `chore(agents): establish scoped rules, skills, and privacy shield`
