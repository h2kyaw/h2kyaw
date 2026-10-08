---
title: "Debug Postmortem: [Issue Title]"
project: "[project-name]"
type: "postmortem"
date: "YYYY-MM-DD"
severity: "High" # Low / Medium / High / Critical
status: "Resolved"
summary: "Brief 1-2 sentence overview of the issue, root cause, and how it was fixed."
tags: ["debugging", "postmortem", "incident"]
---

# Debug Postmortem: [Issue Title]

- **Project**: `[e.g. ~/Projects/hhkbot or ~/websites/id]`
- **Date**: `YYYY-MM-DD`
- **Severity / Impact**: `[Low / Medium / High / Critical]`
- **Status**: `[Resolved / Mitigated]`

---

## 1. Executive Summary
Brief high-level summary of what occurred, symptoms observed, and final resolution.

## 2. Problem Symptoms & Trigger
- What failed or behaved unexpectedly?
- Error messages, stack traces, or anomalous metrics.

## 3. Investigation & Root Cause Analysis (RCA)
- What investigations were performed?
- What was the actual root cause? (e.g. race condition, API breaking change, unhandled edge case).

## 4. Resolution & Fix
- What change was implemented?
- Key files touched and architectural adjustments.
- Code snippet or diff summary:
```ts
// Relevant code or fix logic
```

## 5. Prevention & Future Reference
- What steps prevent recurrence? (e.g. new unit tests, lint rules, CI guards).
- Key takeaway for other projects.
