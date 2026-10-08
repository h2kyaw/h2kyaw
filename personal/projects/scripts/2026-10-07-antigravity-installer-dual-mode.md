---
title: "Antigravity Installer Dual-Mode & Manager Compatibility"
project: "scripts"
type: "feature"
date: "2026-10-07"
summary: "Antigravity-Manager (antigravity-tools) on Linux was failing to detect Antigravity 2.0+ installations or encountering crashes during process lifecycle checks. Investigation reveale..."
tags: ["scripts","engineering"]
---

# Technical Writeup: Antigravity Installer Dual-Mode & Manager Compatibility

- **Project**: `~/Projects/scripts` (`hhkmy/scripts`)
- **Conversation Ref**: `fbafae16-eb26-4654-9ffd-8ad22f02e539`
- **Commit**: [`5a45862`](https://github.com/hhkmy/scripts/commit/5a45862640681e4dab4b662770b8f81265590b72)
- **Date**: 2026-10-07
- **Scope**: Infrastructure / Installer Optimization & Linux Sandbox Hardening

---

## 1. Executive Summary
`Antigravity-Manager` (`antigravity-tools`) on Linux was failing to detect Antigravity 2.0+ installations or encountering crashes during process lifecycle checks. Investigation revealed sandbox permission boundaries (`chrome-sandbox`), process detection path expectations, and absence of standardized global vs user mode installation tiers. The installer in `~/Projects/scripts/antigravity` was refactored to support dual-mode installation (`--global` vs default user space) with automated sandbox capability hardening.

## 2. Root Cause Analysis (RCA)
1. **Sandbox Permission Boundaries**:
   - Modern Chromium/Electron runtimes require root-owned SUID on `chrome-sandbox` (`chmod 4755`) or unprivileged user namespace support. In single-user installs without SUID, launches without fallback flags failed silently.
2. **Path & Process Detection Mismatch**:
   - `antigravity-tools` checks standard binary lookup paths (`/usr/local/bin` / `/usr/bin` for system-wide installations, and `~/.local/bin` for user installations). Non-standard paths prevented version detection.
3. **Desktop Entry & Icon Registration**:
   - Missing MIME type handlers and standardized `.desktop` entries in `/usr/share/applications` (or `~/.local/share/applications`) caused integration dropouts.

## 3. Engineering Solution & Implementation
1. **Dual-Mode Architecture**:
   - **User Mode (Default)**: Installs to `~/.local/share/Antigravity`, symlinks to `~/.local/bin/antigravity`, user `.desktop` entry. Requires zero sudo privileges.
   - **Global Mode (`--global`)**: Installs to `/opt/Antigravity`, symlinks to `/usr/local/bin/antigravity`, system `.desktop` entry in `/usr/share/applications/`.
2. **Sandbox Hardening**:
   - Automatically sets `chown root:root chrome-sandbox && chmod 4755 chrome-sandbox` in global mode.
   - Implements graceful fallback flags when user namespaces are restricted.
3. **Validation & Verification**:
   - Both User Mode and Global Mode were executed and verified against active `antigravity-tools` process discovery.

## 4. Key References & Cross-Links
- Source script: `~/Projects/scripts/antigravity`
- Upstream repo: `https://github.com/hhkmy/scripts`
- Commit: `5a45862 feat(antigravity): add global mode, sandbox hardening, and Antigravity-Manager compatibility`
