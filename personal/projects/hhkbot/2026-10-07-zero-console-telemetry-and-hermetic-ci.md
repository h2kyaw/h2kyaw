---
title: "Zero Raw Console Telemetry & Hermetic Clean-Room CI Gate"
project: "hhkbot"
type: "postmortem"
date: "2026-10-07"
summary: "As hhkbot expanded across 40+ command routers and services, informal debugging practices resulted in scattered console.log and console.error statements across 29 files. These unfor..."
tags: ["hhkbot","postmortem","debugging","telegram","docker"]
---

# Debug Postmortem: Zero Raw Console Telemetry & Hermetic Clean-Room CI Gate

- **Project**: `~/Projects/hhkbot`
- **Date**: `2026-10-07`
- **Severity / Impact**: Medium
- **Status**: Resolved

---

## 1. Executive Summary
As `hhkbot` expanded across 40+ command routers and services, informal debugging practices resulted in scattered `console.log` and `console.error` statements across 29 files. These unformatted outputs polluted production Docker logs, made structured parsing impossible on the Raspberry Pi host, and frequently leaked mock data during CI runs.

Additionally, running the test suite under GitHub Actions CI failed unexpectedly because `src/config/env.ts` executed immediate hard exits (`process.exit(1)`) whenever real Telegram API credentials were not present in the environment.

---

## 2. Problem Symptoms & Trigger
1. **Unstructured Output**: Running `make logs` on the Raspberry Pi produced raw, unparsed JSON strings and multiline stack dumps lacking timestamps, log levels, or subsystem tags.
2. **CI Pipeline Breakage**: Running `pnpm test` in GitHub Actions resulted in process abort:
   ```
   [ERROR] Missing required environment variable: API_ID
   Process completed with exit code 1.
   ```
   Vitest runner crashed before reaching unit test assertions.

---

## 3. Investigation & Root Cause Analysis (RCA)
- **Telemetry Disparity**: Development speed led developers to use ad-hoc `console.log()` calls instead of the centralized `src/utils/logger.ts`. No automated lint or pre-commit gate existed to prevent raw console usage.
- **Environment Rigidity in CI**: `src/config/env.ts` performed synchronous validation at module load time. Because Vitest dynamically loads application modules, loading any service immediately triggered the root `env.ts` exit condition in environments lacking production `.env` files.

---

## 4. Resolution & Fix
- **Structured Logger Migration**:
  - Replaced all raw console calls across 29 files (in `src/bot/`, `src/user/`, `src/services/`, `src/database/`) with structured calls:
  ```ts
  logger.info({ tag: 'Federation', fedId }, 'Threat propagated to linked chat');
  logger.warn({ tag: 'Safety', error: err.message }, 'Circuit breaker triggered');
  ```
- **Automated Verification Gate (`check-no-raw-console.js`)**:
  - Authored `scripts/check-no-raw-console.js` to scan `src/` for forbidden `console.log`, `console.info`, `console.debug`, and `console.error` invocations.
  - Added `pnpm lint:console` script and integrated it into `make verify`.
- **Hermetic Testing & CI Guard**:
  - Configured `vitest.config.ts` to mock essential environment variables (`API_ID`, `API_HASH`, `BOT_TOKEN`, `DATABASE_URL`) during test executions.
  - Guarded `src/config/env.ts` so that `process.exit(1)` is bypassed when `NODE_ENV === 'test'`.
  - Added clean mock environment variables into `.github/workflows/ci.yml`.

---

## 5. Prevention & Future Reference
- `.agents/rules/20-structured-telemetry.md` strictly bans raw console output in production code.
- `.agents/rules/28-hermetic-testing-and-cleanroom.md` ensures tests run completely offline without relying on network or host state.
- Automated CI blocks any pull request or commit that introduces unformatted console logs.
