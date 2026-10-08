---
name: privacy-audit
description: Pre-commit privacy & leak audit checklist verifying zero secret leaks and gitignore compliance.
---

# Privacy & Leak Audit Skill

Run this verification procedure before committing changes or pushing to remote:

1. **Check Untracked & Modified Files**:
   ```bash
   git status
   ```
   - Verify no files from `personal/private/`, `drafts/`, or `.env*` are listed under untracked or staged files.
2. **Scan for Potential Secrets**:
   - Check staged diff for secret patterns:
     ```bash
     git diff --cached | grep -iE "(api[_-]?key|secret|token|password|bearer|begin (rsa|openssh|private) key)"
     ```
3. **Verify Gitignore Integrity**:
   - Run a dry-run check on private directories:
     ```bash
     git check-ignore -v personal/private/test.txt
     ```
   - Must confirm the path is matched by `.gitignore`.
4. **Final Sign-off**:
   - Only proceed with `git commit` once all privacy checks pass cleanly.
