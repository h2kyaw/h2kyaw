---
name: profile-maintainer
description: Safely update, format, and enhance GitHub Profile README without breaking automated action anchors.
---

# Profile Maintainer Skill

Follow this runbook when updating the profile `README.md`:

1. **Verify Dynamic Anchors**:
   - Confirm `<!-- hhkmyid:START -->` and `<!-- hhkmyid:END -->` are present and unedited.
   - Confirm `<!--RECENT_ACTIVITY:start-->` and `<!--RECENT_ACTIVITY:end-->` are intact.
2. **Review Visual Balance**:
   - Check header banners, typing SVGs, and shield badges.
   - Keep badge color codes aligned with brand guides (e.g. Telegram `#26A5E4`, Docker `#2496ED`, Python `#3776AB`).
   - Validate that table/center alignments render cleanly on mobile and desktop viewports.
3. **Verify Links**:
   - Test external links: `https://hhk.my.id`, `https://t.me/MPXMusicBot`, `https://t.me/HeinHtetkyaw`.
4. **Stage & Commit**:
   - Run `git status` to verify only intended changes in `README.md` are staged.
   - Commit using Conventional Commits: `docs(profile): update <target section>`.
