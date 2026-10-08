---
description: Protection of dynamic profile markers, README formatting, and badge integrity.
trigger: glob
globs: "README.md,TEMPLATE.md"
---

# Profile README Integrity & Dynamic Injection Markers

- **Strict Automated Marker Preservation**: Never delete, rename, or manually corrupt dynamic workflow markers:
  - `<!-- hhkmyid:START -->` ... `<!-- hhkmyid:END -->` (managed by blog-post-workflow).
  - `<!--RECENT_ACTIVITY:start-->` ... `<!--RECENT_ACTIVITY:end-->` (managed by recent-activity workflow).
- **Badge & Shield Consistency**: Ensure all badges follow a consistent design system (e.g. `style=for-the-badge` for socials, standard shield tags for tech stack).
- **Dark/Light Mode Aesthetics**: Ensure all embedded images and SVGs render cleanly on both GitHub dark and light backgrounds.
- **Link Validity**: Always verify external URLs, Telegram bot links (`@MPX...`), and domain references (`https://hhk.my.id`).
