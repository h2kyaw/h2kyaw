---
description: Automation workflow governance, cron schedule health, and token permission safety.
trigger: glob
globs: ".github/**/*.yml,.github/**/*.yaml"
---

# GitHub Actions Automation Governance

- **Workflow Integrity**: Ensure workflows (`update-readme.yml`, `hhkmyid-readme.yml`) use up-to-date actions versions (`actions/checkout@v4`, etc.).
- **Permissions Principle of Least Privilege**: Explicitly set granular permissions in workflow files (e.g. `permissions: contents: write`).
- **Secrets Governance**: NEVER hardcode PATs or personal tokens directly in yaml files. Always reference GitHub repository secrets (e.g. `${{ secrets.MY_GITHUB_TOKEN }}`).
- **Cron Frequency**: Keep scheduled workflow runs sensible to prevent exceeding GitHub Actions free tier quotas.
