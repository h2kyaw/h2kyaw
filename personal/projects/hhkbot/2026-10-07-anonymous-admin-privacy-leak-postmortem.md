---
title: "Anonymous Admin Privacy Leak, Ban Overflow & Purge Accuracy"
project: "hhkbot"
type: "postmortem"
date: "2026-10-07"
summary: "During a comprehensive security audit of moderation handlers and admin utilities, three interconnected vulnerabilities were uncovered and remediated: 1. Anonymous Admin Privacy Lea..."
tags: ["hhkbot","postmortem","debugging","telegram"]
---

# Debug Postmortem: Anonymous Admin Privacy Leak, Ban Overflow & Purge Accuracy

- **Project**: `~/Projects/hhkbot`
- **Date**: `2026-10-07`
- **Severity / Impact**: High
- **Status**: Resolved

---

## 1. Executive Summary
During a comprehensive security audit of moderation handlers and admin utilities, three interconnected vulnerabilities were uncovered and remediated:
1. **Anonymous Admin Privacy Leak**: When an administrator posted using Telegram's anonymous admin feature (`is_anonymous`), certain command response cards and logging events mistakenly inspected the underlying sender entity or attempted direct PM routing, risking deanonymization.
2. **32-Bit Ban Timestamp Overflow**: Temporary ban calculations using millisecond timestamps without clamping overflowed Telegram's 32-bit signed integer UNIX timestamp limit, causing temporary bans to fail or convert into permanent bans.
3. **Purge Precision Inaccuracy**: Multi-message deletion commands (`/purge`) failed to account for service messages or deleted chunks exceeding MTProto limits, leading to partial deletions.

---

## 2. Problem Symptoms & Trigger
- **Privacy Leak**: Admin commands issued by `@GroupAnonymousBot` in supergroups exposed errors or failed permission checks because `msg.sender.id` evaluated to the group channel ID rather than a recognized user account.
- **Timestamp Bug**: Running `/tban @user 365d` resulted in integer overflow errors from Telegram MTProto: `FLOOD_WAIT` or invalid `until_date` exceptions.
- **Purge Discrepancy**: Calling `/purge` on 50 messages only removed 20–30 messages if the range contained pinned message alerts or system events.

---

## 3. Investigation & Root Cause Analysis (RCA)
- **Anonymous Admin RCA**: MTProto distinguishes anonymous administrators by setting `sender.id` to the chat's negative ID and displaying the message from `GroupAnonymousBot`. Handlers querying `database.getUser(sender.id)` failed or caused unintentional metadata leaks.
- **Timestamp RCA**: JavaScript `Date.now() + duration` produces millisecond timestamps (13 digits), whereas MTProto `until_date` strictly requires second-based UNIX timestamps (10 digits) capped at `2^31 - 1`. Passing milliseconds caused Telegram to reject the ban parameter.
- **Purge RCA**: `client.deleteMessages` was executed without chunking IDs into bounded batches of 100, and did not filter out messages already deleted or non-deletable system alerts.

---

## 4. Resolution & Fix
- **Anonymous Admin Protection**:
  - Implemented `isAnonymousAdmin(msg)` helper in `src/bot/moderation/admin-guards.ts`.
  - Suppressed sender profile link generation and fallback to chat entity whenever anonymous admin status is detected.
- **Timestamp Sanitization**:
  - Clamped all duration math to valid 32-bit second integers:
  ```ts
  const MAX_UNIX_TIMESTAMP = 2147483647; // 2^31 - 1
  export function toTelegramUntilDate(durationSeconds: number): number {
    const target = Math.floor(Date.now() / 1000) + durationSeconds;
    return Math.min(target, MAX_UNIX_TIMESTAMP);
  }
  ```
- **Paginated Purge Engine**:
  - Chunked message deletions into batches of 100 with sequential promises and graceful error skipping for non-deletable messages.

---

## 5. Prevention & Future Reference
- Added explicit unit test suites in `tests/moderation/anonymous-admin.test.ts` verifying anonymous sender handling.
- Automated static checks forbidding raw millisecond timestamp passing to MTProto methods.
- Documented anonymous admin permission flows in `.agents/rules/17-rbac-and-permissions.md`.
