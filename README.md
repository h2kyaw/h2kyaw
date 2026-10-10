<h1 align="center">Hein Htet Kyaw</h1>

<p align="center">
  <strong>Systems & Network Developer · Telegram MTProto Specialist · Web Architect</strong><br>
  <em>Building resilient bot infrastructure, policy routing networks, and modern web systems.</em>
</p>

<p align="center">
  <a href="https://hhk.my.id"><img src="https://img.shields.io/badge/Website-hhk.my.id-0f172a?style=flat-square&logo=googlechrome&logoColor=white" alt="Website"></a>
  <a href="https://github.com/hhkmy"><img src="https://img.shields.io/badge/Org-@hhkmy-181717?style=flat-square&logo=github&logoColor=white" alt="hhkmy"></a>
  <a href="https://github.com/hhkscripts"><img src="https://img.shields.io/badge/Org-@hhkscripts-181717?style=flat-square&logo=github&logoColor=white" alt="hhkscripts"></a>
  <a href="https://t.me/HeinHtetkyaw"><img src="https://img.shields.io/badge/Telegram-@HeinHtetkyaw-26A5E4?style=flat-square&logo=telegram&logoColor=white" alt="Telegram"></a>
  <a href="https://linkedin.com/in/h2kyaw"><img src="https://img.shields.io/badge/LinkedIn-h2kyaw-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
</p>

---

### 🏢 Engineering Organizations & Workspaces

The primary engineering systems, network infrastructure, and automation suites are developed across two dedicated organizations:

- **[@hhkmy](https://github.com/hhkmy)** — Core web platforms, telemetry pipelines, digital knowledge vaults, and content publishing engines.
- **[@hhkscripts](https://github.com/hhkscripts)** — Telegram MTProto bots, userspace VPN gateways (`sing-box`), edge automation, and payment gateways.

---

### 🤖 Telegram Bot Infrastructure & Systems — [@hhkscripts](https://github.com/hhkscripts)

- **`hhkscripts/hhkbot`** · `🔒 Private Core` · [Architecture Docs](https://hhk.my.id)  
  High-performance Telegram Business userbot and assistant powered by binary MTProto (`@mtcute`), PostgreSQL 16 connection pooling, and Google Gemini AI. Features dual-role dispatchers, enterprise federation defense mesh, and interactive single-bubble settings.

- **`hhkscripts/leavebanbot`** · `🔒 Private Engine` · [Live Bot (@MPXLeaveBanBot)](https://t.me/MPXLeaveBanBot)  
  High-throughput anti-raid group moderation bot that automatically detects and bans users upon exiting groups or linked channels, backed by PostgreSQL persistence and mass unban tools.

- **`hhkscripts/cryptowalletbot`** · `🔒 Private System`  
  Financial bot integrating Telegram Stars, Fragment TON wallet top-ups, Telegram Premium gifting, ad balance recharges, and automated TON address detection.

- **`hhkscripts/smileonebot`** · `🔒 Private System`  
  Telegram bot and containerized FastAPI backend for automated Mobile Legends top-ups via SmileOne, featuring database session management and country-aware SKU selectors.

- **`hhkscripts/songbot`** · `🔒 Private Service` · [Live Bot (@MPXSongBot)](https://t.me/MPXSongBot)  
  Production-grade YouTube-to-MP3 extraction Telegram bot and asynchronous FastAPI backend with automated audio conversion.

- **`hhkscripts/smmbot`** · `🔒 Private Suite` · [Live Bot (@MPXSMMBot)](https://t.me/MPXSMMBot)  
  Social Media Marketing (SMM) Telegram panel integration with automated order placement, real-time balance tracking, and automated CI/CD deployments.

- **`hhkscripts/markdownbot`** · `🔒 Private Utility`  
  Serverless Telegram bot deployed on Cloudflare Workers that parses Markdown links into inline keyboards, preserves custom emoji, and forwards messages via Cloudflare KV.

- **[`hhkscripts/FileStore`](https://github.com/hhkscripts/FileStore)** · `🌐 Public System`  
  Telegram file storage engine providing permanent shortlinks, configurable auto-delete timers, and Multi-Force-Subscribe verification.

- **[`hhkscripts/MPXMusicV2`](https://github.com/hhkscripts/MPXMusicV2)** & **[`hhkscripts/MPXMusicPlugins`](https://github.com/hhkscripts/MPXMusicPlugins)** · `🌐 Public System` · [Live Bot (@MPXMusicBot)](https://t.me/MPXMusicBot)  
  Low-latency YouTube music and playlist streaming engine for Telegram voice chats, complete with modular plugin architecture.

- **[`hhkscripts/TgMusicBot`](https://github.com/hhkscripts/TgMusicBot)** · `🌐 Public System`  
  Python and Py-Tgcalls group call audio streaming bot with multi-platform playback (YouTube, Spotify, Apple Music, SoundCloud).

- **Specialized Utility Bots** · `🔒 Private Services`  
  - `hhkscripts/reactionbot` — Channel post automated reaction system.
  - `hhkscripts/idbot` — Deep entity, peer, and user ID lookup tool.
  - `hhkscripts/monitorbot` — Continuous Telegram bot and infrastructure uptime watchdog.
  - `hhkscripts/MPXVideoBot` — High-definition video downloader service.
  - `hhkscripts/smm` — SMMLab social media marketing management platform.
  - `hhkscripts/minibots` — Collection of micro-automation handlers and utilities.

---

### 🛡️ Networks, Systems & Edge Tooling — [@hhkscripts](https://github.com/hhkscripts) & [@hhkmy](https://github.com/hhkmy)

- **[`hhkscripts/rpi-vpn-hotspot`](https://github.com/hhkscripts/rpi-vpn-hotspot)** · `🌐 Public Project` · [Postmortem & Specs](https://hhk.my.id)  
  Turnkey Raspberry Pi Wi-Fi hotspot router featuring Multi-VPN routing (`sing-box` VLESS Reality, AmneziaWG, WireGuard, OpenVPN), AdGuard Home DNS-over-HTTPS leak prevention, and Telegram remote control.

- **[`hhkmy/scripts`](https://github.com/hhkmy/scripts)** · `🌐 Public Tooling` · [Read Writeup](https://hhk.my.id)  
  Developer automation suite and dual-mode installer served globally through a Cloudflare Worker edge reverse proxy (`scripts.hhk.my.id`).

- **[`hhkmy/stats`](https://github.com/hhkmy/stats)** · `🌐 Public Service`  
  Centralized system status, uptime monitoring, and issue tracking dashboard.

- **[`h2kyaw/novaproxy`](https://github.com/h2kyaw/novaproxy)** · `🌐 Public Project`  
  Network proxy management panel and traffic detour orchestration.

- **[`h2kyaw/cf-workers-telegram-bot`](https://github.com/h2kyaw/cf-workers-telegram-bot)** · `🌐 Public Boilerplate`  
  High-performance serverless Telegram bot template for Cloudflare Workers.

---

### 🌐 Web Platforms & Knowledge Hub — [@hhkmy](https://github.com/hhkmy) & [@h2kyaw](https://github.com/h2kyaw)

- **[`hhkmy/id`](https://github.com/hhkmy/id)** · `🌐 Public Hub` · [Visit Site](https://hhk.my.id)  
  Official digital home and engineering knowledge base ([hhk.my.id](https://hhk.my.id)) hosting Architecture Decision Records (ADRs), postmortems, and developer guides.

- **`hhkmy/channelenth`** · `🔒 Private Platform`  
  Modern Myanmar content platform with 1,050+ curated articles and an offline-first Flutter Android reader application.

- **[`hhkmy/speedlify`](https://github.com/hhkmy/speedlify)** · `🌐 Public Benchmark`  
  Automated web performance, Core Web Vitals, and accessibility benchmark tracking system.

- **[`hhkmy/dlread`](https://github.com/hhkmy/dlread)** & **[`hhkmy/Reading`](https://github.com/hhkmy/Reading)** · `🌐 Public Tools`  
  Reading interface themes and document processing utilities.

- **[`h2kyaw/recap-en-to-mm`](https://github.com/h2kyaw/recap-en-to-mm)** · `🌐 Public Tool`  
  AI-assisted English-to-Myanmar recap and translation utility.

- **[`h2kyaw/GuidesByMPX`](https://github.com/h2kyaw/GuidesByMPX)** · `🌐 Public Guides`  
  Curated developer tutorials and Telegram platform best practices in Myanmar language.

---

### 📝 Recent Technical Notes & Articles

<div style="list-style-type: '📖 ';">

<!-- hhkmyid:START -->&emsp;&emsp;📖 <a href='https://hhk.my.id/posts/key-is-stored-in-legacy-trusted-gpg-keyring/' target='_blank'>Key ကို Legacy Trusted.gpg Keyring မှာ သိမ်းထားခြင်း</a><br>&emsp;&emsp;📖 <a href='https://hhk.my.id/posts/finally-got-my-domain/' target='_blank'>Finally My Domain Name - hhk.my.id</a><br>&emsp;&emsp;📖 <a href='https://hhk.my.id/posts/ssh-gpg-keys-backup-restore-secure-github-setup/' target='_blank'>SSH &amp; GPG Keys: Backup, Restore &amp; Secure GitHub Setup</a><br>&emsp;&emsp;📖 <a href='https://hhk.my.id/posts/ms-activation-scripts/' target='_blank'>Microsoft Activation Scripts</a><br>&emsp;&emsp;📖 <a href='https://hhk.my.id/posts/office365-with-developer-account/' target='_blank'>Office 365 with Developer Account</a><br>&emsp;&emsp;📖 <a href='https://hhk.my.id/posts/domain-dns-journey/' target='_blank'>Domain &lpar;DNS&rpar; Journey</a><br>&emsp;&emsp;📖 <a href='https://hhk.my.id/posts/download-m3u8-ffmpeg/' target='_blank'>Download m3u8 with ffmpeg</a><br>&emsp;&emsp;📖 <a href='https://hhk.my.id/posts/chemical/' target='_blank'>Chemical</a><br>&emsp;&emsp;📖 <a href='https://hhk.my.id/posts/diagrams/' target='_blank'>Diagrams</a><br>&emsp;&emsp;📖 <a href='https://hhk.my.id/posts/hyper-git-terminal-customize/' target='_blank'>Hyper + Git Terminal Customize</a><br><!-- hhkmyid:END -->

</div>

---

### ⚡ Recent Activity

<!--RECENT_ACTIVITY:start-->
1. ⬆️ Pushed commit(s) to [hhkmy/stats](https://github.com/hhkmy/stats)<br>
2. ⬆️ Pushed commit(s) to [h2kyaw/h2kyaw](https://github.com/h2kyaw/h2kyaw)<br>
3. ⬆️ Pushed commit(s) to [h2kyaw/h2kyaw](https://github.com/h2kyaw/h2kyaw)<br>
4. ⬆️ Pushed commit(s) to [h2kyaw/h2kyaw](https://github.com/h2kyaw/h2kyaw)<br>
5. 🔱 Forked [h2kyaw/recap-en-to-mm](https://github.com/h2kyaw/recap-en-to-mm) from [tharlaimar/recap-en-to-mm](https://github.com/tharlaimar/recap-en-to-mm)<br>
6. ⭐ Starred [tharlaimar/recap-en-to-mm](https://github.com/tharlaimar/recap-en-to-mm)<br>
7. ⬆️ Pushed commit(s) to [h2kyaw/h2kyaw](https://github.com/h2kyaw/h2kyaw)<br>
8. ⬆️ Pushed commit(s) to [hhkmy/stats](https://github.com/hhkmy/stats)<br>
9. ⬆️ Pushed commit(s) to [hhkmy/scripts](https://github.com/hhkmy/scripts)<br>
10. ⬆️ Pushed commit(s) to [hhkmy/stats](https://github.com/hhkmy/stats)<br>
<!--RECENT_ACTIVITY:end-->

---

<p align="center">
  <em>Looking to collaborate on systems engineering, bot infrastructure, or custom web architecture? Feel free to connect via <a href="https://t.me/HeinHtetkyaw">Telegram</a>.</em>
</p>
