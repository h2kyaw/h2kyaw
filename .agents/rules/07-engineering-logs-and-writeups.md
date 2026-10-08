---
description: High-signal engineering writeups, debugging postmortems, architecture logs, and analytics.
trigger: model_decision
---

# Engineering Writeups & Architecture Logs Governance

- **High-Signal Technical Documentation**:
  - Focus on **Root Causes, System Architecture Decisions, Performance Benchmarks, and Analytics**.
  - **Zero Trivial Chatter**: Never generate run-of-the-mill logs recounting mundane operations (e.g. "Ran git commit, staged 2 files, pushed branch").
- **Target Organization**:
  - Store project writeups in `personal/projects/<project-name>/` (e.g., `personal/projects/hhkbot/`, `personal/projects/id/`).
  - Filename format: `YYYY-MM-DD-<slug>.md` (e.g., `2026-10-07-mtproto-session-recovery.md`).
- **Standardized Templates & Mandatory YAML Frontmatter**:
  - Always conform to the blueprints in `personal/projects/_templates/` (`debug-postmortem`, `architecture-decision`, `feature-writeup`).
  - **MANDATORY**: Every project log MUST begin with YAML frontmatter containing `title`, `project`, `type`, `date`, `summary`, and `tags`.
  - **Zero Generic Summaries**: The `summary` must be a high-signal 1-2 sentence technical takeaway of the problem and fix, never generic boilerplates.
- **Project Scoping & Organization**:
  - Keep logs grouped strictly under their parent project folder `personal/projects/<project-name>/`.
  - Allowed project scopes: `hhkbot`, `vpn`, `scripts`, `id` (hhk.my.id), or any active repository in `~/Projects/` and `~/websites/`.
- **Proactive Suggestion on Major Milestones**:
  - Whenever an agent resolves a complex bug, conducts an architecture refactor, or establishes new benchmarks, the agent MUST proactively offer: *"Would you like me to document this incident/decision in `personal/projects/<project>/`?"*
- **Retroactive Recovery & Backfill**:
  - If a session ended without a writeup, records can be reconstructed anytime from conversation transcripts (`<conversation-id>`) or Git revision history (`git log -p`).
- **Sanitization & Privacy**:
  - Strip bot API tokens, database connection credentials, live customer data, and internal production secrets before writing logs.

