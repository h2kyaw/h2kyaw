---
description: Git discipline, atomic commits, conventional commit syntax, and clean hygiene.
trigger: model_decision
---

# Git Discipline: Conventional Commits & Atomic Hygiene

All commits in this repository must strictly adhere to the Conventional Commits v1.0.0 specification and maintain clean, atomic git hygiene.

## 1. Commit Message Structure & Syntax

```text
<type>(<scope>): <imperative summary>

[optional body: context, technical rationale, why the change was made]

[optional footer: References, Closes #issue]
```

### Formatting Rules:
- **Header Line Length**: Maximum 72 characters.
- **Mood**: Use the imperative present tense (e.g., `add`, `fix`, `update`, `refactor` — NOT `added`, `fixes`, `updating`).
- **Punctuation**: No trailing period in the summary header.
- **Body Separation**: Blank line between summary header and body. Wrap body lines at 80 characters.

---

## 2. Standard Types & Scopes

### Permitted Types
| Type | Purpose | Example |
| :--- | :--- | :--- |
| **`docs`** | Documentation, markdown notes, README changes, knowledge records | `docs(notes): add linux server hardening guide` |
| **`feat`** | New features, Astro components, site pages, or major additions | `feat(site): add svg icon component and project filters` |
| **`fix`** | Bug fixes, broken links, template errors, action marker repairs | `fix(profile): resolve undefined commit count in activity` |
| **`ci`** | GitHub Actions workflows, cron schedules, runner configurations | `ci(actions): update checkout action to v4` |
| **`refactor`** | Code or content restructuring without changing behavior or adding features | `refactor(projects): standardize yaml frontmatter across logs` |
| **`chore`** | Maintenance, dotfiles, `.gitignore`, dependencies, agent rules/skills | `chore(agents): establish conventional commit skill` |
| **`perf`** | Performance improvements (e.g. Astro static build optimization) | `perf(site): optimize content collection loaders` |

### Standard Scopes
| Scope | Target Directory / Component |
| :--- | :--- |
| **`profile`** | Root GitHub Profile showcase (`README.md`) |
| **`notes`** | Technical notes and study articles in `personal/notes/` |
| **`projects`** | Architecture decisions and debug logs in `personal/projects/` |
| **`snippets`** | Practical shell scripts, dotfiles, cheatsheets in `personal/snippets/` |
| **`personal`** | Broad updates spanning multiple folders in `personal/` |
| **`site`** | Astro static knowledge hub in `site/` (components, pages, styles) |
| **`actions`** | Scheduled and automated GitHub Actions in `.github/` |
| **`agents`** | Agent architecture rules (`.agents/rules/`) and skills (`.agents/skills/`) |
| **`config`** | Workspace config, root dotfiles, `.gitignore`, `.ignore` |

---

## 3. Pre-Commit Verification & Atomic Hygiene

1. **Pre-Commit Privacy Audit**: Run a privacy check before staging. Verify that `personal/private/`, API tokens, `.env`, or sensitive keys are not staged.
2. **Atomic Commits**: Stage and commit related files together. Never bundle unrelated changes (e.g., do not combine profile README updates with Astro website components or personal notes).
3. **Explicit Staging**: Use explicit `git add <files>` instead of indiscriminate `git add .` to avoid committing unwanted scratch files or build artifacts.
