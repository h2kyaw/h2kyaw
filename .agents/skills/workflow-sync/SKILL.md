---
name: workflow-sync
description: Maintenance, validation, and testing procedure for GitHub Actions profile automation workflows.
---

# GitHub Actions Workflow Sync & Verification Skill

Follow this runbook when auditing or updating automated profile workflows:

1. **Audit Workflow Definitions**:
   - Check `.github/workflows/update-readme.yml` and `.github/workflows/hhkmyid-readme.yml`.
   - Ensure action versions are supported (`actions/checkout@v4`, modern runners).
2. **Review Configs & Secrets**:
   - Verify `.github/recent-activity.config.yml` settings (username `h2kyaw`, timezone `Asia/Yangon`).
   - Confirm secret names (`MY_GITHUB_TOKEN`) match repository secrets in GitHub settings.
3. **Validate Triggers & Schedules**:
   - Verify cron syntax (`0 0 * * 0` for weekly, `0 */24 * * *` for daily).
   - Ensure `workflow_dispatch:` is declared to allow manual on-demand triggers via GitHub UI.
