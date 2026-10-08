---
description: Zero-tolerance privacy protection, secrets shielding, and private notes isolation.
trigger: model_decision
---

# Privacy Guardrails & Secrets Shield

- **Zero-Tolerance Secrets Policy**: NEVER commit tokens (`GITHUB_TOKEN`, bot tokens, Telegram API keys), private keys (`*.key`, `*.pem`, `id_rsa`, `id_ed25519`), or `.env` files.
- **Private Notes Isolation**:
  - Any confidential notes, personal plans, or private records must be saved in `personal/private/` or given the `.private.md` extension.
  - Verify that private directories and file patterns are properly respected by `.gitignore`.
- **Pre-Commit Inspection**: Before staging or committing any files in `personal/`, inspect content to ensure no phone numbers, passwords, recovery codes, or private credentials are included.
