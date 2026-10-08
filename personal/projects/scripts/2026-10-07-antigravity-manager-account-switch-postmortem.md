---
title: "Antigravity-Manager Account Switching & Linux Version Detection Failure"
project: "scripts"
type: "postmortem"
date: "2026-10-07"
summary: "When using Antigravity-Manager (antigravity-tools v4.9.7-beta.0) to switch Google accounts on Linux, switching appeared to complete but immediately reverted back to the previous ac..."
tags: ["scripts","postmortem","debugging"]
---

# Debug Postmortem: Antigravity-Manager Account Switching & Linux Version Detection Failure

- **Project**: `~/Projects/scripts` (`hhkmy/scripts`)
- **Conversation Ref**: `fbafae16-eb26-4654-9ffd-8ad22f02e539`
- **Date**: 2026-10-07
- **Severity / Impact**: High (Account switching completely failed and silently reverted to previous user)
- **Status**: Resolved

---

## 1. Executive Summary

When using `Antigravity-Manager` (`antigravity-tools` v4.9.7-beta.0) to switch Google accounts on Linux, switching appeared to complete but immediately reverted back to the previous account. Analysis revealed a multi-stage bug chain: `antigravity-tools` failed to detect the installed Antigravity version (2.19.1), misclassified it as "Antigravity classic (< 2.0.0)", and erroneously injected OAuth credentials into a legacy VS Code SQLite database (`state.vscdb`) instead of the Linux System Keyring (`org.freedesktop.secrets`). 

The root cause was traced via binary reverse engineering to an unhandled Electron packaging detail (`app.asar` vs loose `resources/app/package.json`) combined with Electron's `SingleInstanceLock` silencing stdout on background `--version` checks while the application was active. A permanent fix was implemented in `~/Projects/scripts/antigravity` via automatic loose metadata synchronization, SUID sandbox hardening, and robust process termination hygiene.

---

## 2. Problem Symptoms & Trigger

### Symptoms Observed
1. **Version Detection Failure**:
   ```text
   [Desktop] Failed to detect Antigravity version (Unable to determine Antigravity version on Linux), but detected existing SQLite database. Falling back to SQLite injection.
   [Desktop] Determined target environment is Antigravity classic, using classic account switch logic.
   ```
2. **Immediate Account Reversion**:
   Antigravity 2.0+ ignored the SQLite database upon relaunch and loaded existing tokens from the Linux System Keyring (`login` collection), immediately reverting to the old account:
   ```text
   Discovered OAuth state in System Keyring/Keychain
   自动触发刷新配额: <previous-account>@gmail.com
   ```
3. **Process Teardown Timeouts & Zombie Processes**:
   `antigravity-tools` discovered 90+ helper processes (`language_server`, zygote, gpu, renderers) and timed out waiting for exit, leaving `<defunct>` zombie processes:
   ```text
   WARN Graceful exit timeout, force killing 92 remaining processes (SIGKILL)
   WARN Still running after timeout, attempting final sweep kill on PIDs...
   ```

---

## 3. Investigation & Root Cause Analysis (RCA)

Binary inspection of `/usr/bin/antigravity-tools` (Rust binary) mapped the exact version detection function `get_antigravity_version_with_path`:

```
executable_path.parent().join("resources/app/package.json")
```

### Stage 1: The Missing Loose File (`app.asar` vs `package.json`)
- In Linux distributions (including Google's official `.deb`), Electron packages application code into an ASAR archive (`/opt/Antigravity/resources/app.asar`).
- A loose directory `/opt/Antigravity/resources/app/` does not exist on disk.
- Therefore, `fs::read_to_string` on `resources/app/package.json` **always failed**.

### Stage 2: Electron Single Instance Lock Swallowing `--version`
- When the loose file read failed, the tool fell back to executing:
  ```rust
  Command::new("/opt/Antigravity/antigravity").arg("--version").output()
  ```
- **The Pitfall**: Because Antigravity was currently running, Electron's `app.requestSingleInstanceLock()` intercepted the second invocation, forwarded command-line arguments via IPC to the primary running instance, and immediately terminated the second process with exit code 0 and **empty stdout**.
- The regex parser received empty output, raised `Unable to determine Antigravity version on Linux`, and fell back to `classic (< 2.0.0)` logic.

### Stage 3: The Architecture Mismatch (SQLite vs System Keyring)
- **Antigravity 1.x (Classic)**: Stored credentials in VS Code SQLite databases (`state.vscdb`).
- **Antigravity 2.0+ (Agentic Desktop)**: Uses Linux Secret Service / Keyring (`login` collection) and CLI credential files (`~/.gemini/oauth_creds.json` and `~/.gemini/antigravity-cli/antigravity-oauth-token`).
- Because the tool fell back to Classic mode, it only modified SQLite. The actual Antigravity 2.0 runtime read the unchanged System Keyring and stayed on the old account.

### Stage 4: Zombie / Defunct Child Processes
- Antigravity child processes spawned by `antigravity-tools` were terminated without calling `wait()` or `try_wait()`.
- On Linux, zombie (`<defunct>`) processes cannot be killed with `kill -9` (SIGKILL). They only disappear when the parent reaps them or terminates.
- `antigravity-tools` scanned the process table, matched the defunct PIDs, and repeatedly failed to kill them during timeout sweeps.

---

## 4. Resolution & Fix

The root problem was solved by updating `~/Projects/scripts/antigravity` (commit [`5a45862`](https://github.com/hhkmy/scripts/commit/5a45862)):

### 1. Loose Metadata Synchronization (`resources/app/package.json`)
The installer guarantees that external tools find loose version metadata on disk without invoking the binary:

```bash
ensure_package_json_metadata() {
    local target_dir="$1"
    local version="$2"

    if [[ -d "$target_dir" && -n "$version" && "$version" != "unknown" ]]; then
        mkdir -p "$target_dir/resources/app"
        cat > "$target_dir/resources/app/package.json" <<EOF
{
  "name": "antigravity",
  "productName": "Antigravity",
  "version": "$version",
  "description": "Antigravity - Agentic Desktop Application"
}
EOF
        log_ok "Synchronized resources/app/package.json metadata."
    fi
}
```

### 2. Dual-Mode Installation Architecture
- **Global Mode (`--global` / `/opt/Antigravity`)**: Aligns with Google's FHS deb package standard, registers with `update-alternatives` and `/usr/local/bin`, and sets SUID on `chrome-sandbox` (`chown root:root && chmod 4755`).
- **User Mode (`$HOME/.local/share/antigravity`)**: Isolated user-space install with automated fallback detection.

### 3. Graceful Process Teardown
Implemented a clean 2-stage shutdown sequence in `terminate_antigravity_processes()`:
- `SIGTERM` sent to `antigravity` and `language_server` with a 5-second polling loop to allow socket and state persistence.
- `SIGKILL` fallback only if processes remain stubborn.

---

## 5. Verification & Outcomes

Following the patch, running account switch in `Antigravity-Manager` immediately succeeded without requiring manual app restarts:

```text
INFO modules::logger [Desktop] Detected Antigravity version 2.19.1 >= 2.0.0, using system Keyring.
INFO modules::logger [Desktop] Writing token to system credential store for: target_user@example.com
INFO modules::logger [Desktop] Successfully synced credential to Secret Service 'login' collection.
INFO modules::logger [Desktop] Successfully synced file-based credentials to ~/.gemini/oauth_creds.json
INFO modules::logger Account switch core logic completed: target_user@example.com
```

- **Version Detection**: 100% instant match via `resources/app/package.json` (no `--version` spawned).
- **Keyring Sync**: Correctly wrote to Secret Service `login` collection.
- **Zero Account Reversion**: Antigravity 2.0 opened directly into the target account.
