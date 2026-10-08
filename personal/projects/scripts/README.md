# System Scripts & Automation Engineering Logs

This directory contains engineering logs, debug postmortems, and architecture decision records (ADRs) for `~/Projects/scripts` ([`hhkmy/scripts`](https://github.com/hhkmy/scripts)).

---

## Technical Writeups Index

| Date | Type | Document | Summary |
| :--- | :--- | :--- | :--- |
| 2026-10-07 | Postmortem | [Antigravity-Manager Account Switch Bug](2026-10-07-antigravity-manager-account-switch-postmortem.md) | Reverse engineering `antigravity-tools`, Electron single-instance lock, SQLite vs System Keyring mismatch, and metadata fix. |
| 2026-10-07 | Architecture | [Cloudflare Worker Edge Proxy](2026-10-07-cloudflare-worker-edge-proxy.md) | High-performance reverse proxy powering `scripts.hhk.my.id` with User-Agent routing and CI/CD automation. |
| 2026-10-07 | Architecture | [Antigravity Installer Dual-Mode](2026-10-07-antigravity-installer-dual-mode.md) | FHS-compliant `/opt/Antigravity` global mode, SUID sandbox hardening, and user-space isolation. |

---

## Infrastructure Overview

- **Repository**: `~/Projects/scripts`
- **Edge URL Hub**: `https://scripts.hhk.my.id`
- **CI/CD**: GitHub Actions via `cloudflare/wrangler-action@v3`
