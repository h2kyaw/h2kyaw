---
title: "Cloudflare Pages Deployment Pruner"
category: "DevOps"
language: "sh"
summary: "Automated bash utility using Wrangler CLI and jq to fetch and force-delete stale Cloudflare Pages preview and build deployments."
tags: ["cloudflare", "wrangler", "devops", "bash"]
---

# Cloudflare Pages Deployment Pruner

Bash utility to bulk delete stale, failed, or excessive preview deployments from Cloudflare Pages using `wrangler` and `jq`.

## Problem Context
Cloudflare Pages generates a new deployment hash for every commit push or preview branch. Over months of active development, projects hit deployment list limits or clutter dashboard audit trails.

## The Script

```bash
#!/bin/bash
set -euo pipefail

PROJECT="${1:-hhkmyidold}"

echo "🚀 Scanning deployments for Cloudflare Pages project: $PROJECT"
echo "⚠️  This will delete all matched preview and stale deployments!"

# Fetch all deployment IDs using wrangler JSON output
ALL_IDS=$(npx wrangler pages deployment list --project-name="$PROJECT" --json 2>/dev/null \
  | jq -r '.[] | select(.Id != null) | .Id')

if [ -z "$ALL_IDS" ] || [ "$ALL_IDS" = "null" ]; then
  echo "✅ No deployments found or project is clean."
  exit 0
fi

TOTAL=$(echo "$ALL_IDS" | wc -l | tr -d ' ')
echo "📦 Found $TOTAL deployment(s) to process."

# Iterate and force delete each deployment
for id in $ALL_IDS; do
  echo "🗑️ Deleting deployment: $id"
  if npx wrangler pages deployment delete --project-name="$PROJECT" --force "$id" 2>/dev/null; then
    echo "  ✅ Deleted: $id"
  else
    echo "  ⚠️ Skipped: $id (active production deployment cannot be deleted while assigned)"
  fi
done

echo ""
echo "📌 Current deployment status:"
npx wrangler pages deployment list --project-name="$PROJECT"
```

## Production Branch Unlocking Tip
If an active production deployment cannot be deleted via CLI:
1. Switch the project's production branch temporarily in the Cloudflare Dashboard to a dummy branch name (e.g. `temp`).
2. Run `npx wrangler pages deployment delete --project-name=$PROJECT --force <DEPLOYMENT_ID>`.
