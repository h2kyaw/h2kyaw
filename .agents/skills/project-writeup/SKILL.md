---
name: project-writeup
description: Synthesize high-signal engineering logs, debugging postmortems, architecture decisions, and analytics across local projects into permanent technical references.
---

# Project Engineering Writeup Skill

Use this workflow to generate professional technical writeups and architecture records from development, debugging, or analytics sessions across `~/Projects/` and `~/websites/`:

## 1. Classify the Record Type
Determine the primary nature of the technical session:
- **Debug / Incident Investigation** -> Use `debug-postmortem.template.md`.
- **System / Architecture Decision** -> Use `architecture-decision.template.md`.
- **Feature, Optimization, or Analytics Benchmark** -> Use `feature-writeup.template.md`.

## 2. Extract High-Signal Technical Facts
Filter out low-level operational trivia (e.g. routine file staging, git commands). Capture:
- **Core Challenge**: The specific bug, limitation, or requirement.
- **Root Cause & Diagnosis**: Why it occurred and evidence gathered (traces, benchmarks, logs).
- **Engineering Solution**: The design approach, key code snippets, or configuration changes.
- **Measurable Outcomes**: Latency improvements, test coverage gains, error rate drops, or architectural cleanups.

## 3. Generate & Save Document
- **Frontmatter First**: Begin the markdown file with complete YAML frontmatter:
  ```yaml
  ---
  title: "Clear, Human-Readable Title"
  project: "hhkbot" # or vpn, scripts, id
  type: "postmortem" # postmortem, adr, feature, or benchmark
  date: "YYYY-MM-DD"
  summary: "High-signal 1-2 sentence takeaway of problem, root cause, and fix."
  tags: ["tag1", "tag2"]
  ---
  ```
- Path: `personal/projects/<project-name>/<YYYY-MM-DD>-<kebab-topic>.md`.
- Ensure directory exists: `mkdir -p personal/projects/<project-name>/`.
- Sanitize: Ensure no live tokens, passwords, or customer data exist in the markdown content.

## 4. Cross-Reference Index
- Optionally add a brief link in `personal/projects/<project-name>/README.md` if one exists.

## 5. Retroactive Recovery & Backfill (Forgotten Sessions)
If a session was closed or forgotten without writing a log:
1. **Via Conversation ID**: Read `<appDataDir>/brain/<conversation-id>/.system_generated/logs/transcript.jsonl` to reconstruct what was debugged and decided.
2. **Via Git History**: Run `git log -p -n 5` inside `~/Projects/<name>` or `~/websites/<name>` to inspect recent commits and craft an accurate postmortem or ADR retroactively.

