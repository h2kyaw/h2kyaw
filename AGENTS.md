# Workspace Rules: Hein Htet Kyaw GitHub Profile & Knowledge Base

## 1. Project Overview & Architecture
- **Repository Type**: GitHub Profile Showcase (`h2kyaw/h2kyaw`) & Personal Knowledge Base.
- **Key Components**:
  - `README.md`: Public GitHub profile landing page with automated activity & blog feeds.
  - `.github/`: Scheduled GitHub Actions workflows for automated README updates.
  - `personal/`: Structured directory for notes, career logs, snippets, and local private vaults.
  - `site/`: Astro static knowledge hub directly rendering `personal/` markdown records.

## 2. Core Non-Negotiable Engineering Policies
- **Profile Marker Protection**: Never corrupt or remove dynamic injection markers (`<!-- hhkmyid:* -->`, `<!--RECENT_ACTIVITY:*-->`).
- **Privacy First (Zero Secrets Leak)**: Never commit API tokens, passwords, private keys, or confidential drafts. Keep all sensitive notes strictly inside `personal/private/` (safeguarded by `.gitignore`).
- **Clean Markdown Standards**: Strictly adhere to GitHub Flavored Markdown (GFM), semantic headings, and clean formatting.
- **Git Discipline**: Use Conventional Commits (`docs(profile): ...`, `docs(personal): ...`, `ci(actions): ...`) with atomic units of work.

## 3. Scoped Rules & Workflows
- **Maintenance Policy for AI Agents**:
  - **NEVER append bulky rules or runbooks to `AGENTS.md`**. Keep `AGENTS.md` strictly as a concise index (< 40 lines).
  - **New Rules**: Add them to `.agents/rules/<number>-<name>.md` with frontmatter (`trigger: glob` or `trigger: model_decision`).
  - **New Skills / Workflows**: Add them to `.agents/skills/<name>/SKILL.md` with YAML frontmatter (`name` and `description`).
- **Customizations Index**:
  - Domain rules: `.agents/rules/*.md` (`01-profile-readme-integrity`, `02-privacy-and-secrets-shield`, `03-markdown-and-documentation-standards`, `04-git-discipline`, `05-personal-knowledge-governance`, `06-github-actions-automation`, `07-engineering-logs-and-writeups`).
  - Runbooks & Skills: `.agents/skills/` (`profile-maintainer`, `personal-doc-curator`, `privacy-audit`, `workflow-sync`, `project-writeup`, `git-commit`).

