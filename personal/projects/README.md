# Project Engineering Writeups & Architecture Logs

This directory maintains professional engineering writeups, debug postmortems, architecture decision records (ADRs), and technical analytics for projects in `~/Projects/` and `~/websites/`.

## Purpose
- **Permanent Technical Reference**: Capture root cause analysis (RCA), non-obvious bugs, system design decisions, and performance benchmarks.
- **Zero Trivial Noise**: Avoid micro-commit chatter ("pushed commit X"). Focus on why decisions were made and how complex problems were resolved.
- **Cross-Project Knowledge Sharing**: Easily search past solutions when facing similar challenges in other projects.

## Structure
```
personal/projects/
├── _templates/                         # Standardized writeup blueprints
│   ├── debug-postmortem.template.md    # Incident & root-cause postmortem
│   ├── architecture-decision.template.md # ADR (Context, Decision, Consequences)
│   └── feature-writeup.template.md     # Feature delivery & technical spec
├── hhkbot/                             # Writeups & logs for ~/Projects/hhkbot
├── id/                                 # Writeups & logs for ~/websites/id (hhk.my.id)
├── scripts/                            # Writeups for system utilities and installers
├── vpn/                                # Writeups & ADRs for ~/Projects/vpn (rpi-vpn-hotspot)
└── <project-name>/                     # Writeups for any target repository
```

---

## Active Projects Index

| Project | Location | Status | Primary Focus |
| :--- | :--- | :--- | :--- |
| [**hhkbot**](hhkbot/README.md) | `~/Projects/hhkbot` | Active | Telegram MTProto Business Userbot, Federation 2.0 & MissRose/GroupHelp Parity |
| [**vpn**](vpn/README.md) | `~/Projects/vpn` | Active | Raspberry Pi VPN Gateway, VLESS Reality Detour & AdGuard DNS Sinkhole |
| [**scripts**](scripts/README.md) | `~/Projects/scripts` | Active | Developer Shell Scripts, Antigravity Installer, and Cloudflare Edge Proxy (`scripts.hhk.my.id`) |

