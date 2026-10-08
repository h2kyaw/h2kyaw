---
title: "GitHub Actions Failed Workflow Runs Cleaner"
category: "Automation"
language: "sh"
summary: "Production bash script using GitHub CLI (gh api) and jq to paginate and bulk-delete failed workflow runs."
tags: ["github-actions", "bash", "ci-cd", "gh-cli"]
---

# GitHub Actions Failed Workflow Runs Cleaner

Automated cleanup utility to purge failed CI/CD workflow runs across repositories using the GitHub CLI (`gh api`) with robust pagination handling.

## Problem Context
When automated scheduled workflows (such as periodic profile README updaters or cron jobs) fail repeatedly during network hiccups or upstream API limits, hundreds of failed run records accumulate in GitHub Actions history. The web UI only allows deleting runs one by one.

## The Script

```bash
#!/bin/bash
set -euo pipefail

# Disable interactive pagers to run cleanly in scripts
export GH_PAGER=""
export PAGER=""

OWNER="h2kyaw"
REPO="h2kyaw"
WORKFLOW_FILE="update-readme.yml" # or hhkmyid-readme.yml

echo "🔍 Resolving workflow ID for '$WORKFLOW_FILE'..."
WORKFLOW_ID=$(gh api "repos/$OWNER/$REPO/actions/workflows" \
  --jq ".workflows[] | select(.path == \".github/workflows/$WORKFLOW_FILE\") | .id" | cat)

if [ -z "$WORKFLOW_ID" ]; then
  echo "❌ Workflow $WORKFLOW_FILE not found in $OWNER/$REPO"
  exit 1
fi

echo "✅ Found workflow ID: $WORKFLOW_ID"

# Paginate and delete failed runs
PAGE=1
TOTAL_DELETED=0

while true; do
  echo "📄 Scanning page $PAGE for failure runs..."
  
  RESPONSE=$(gh api "repos/$OWNER/$REPO/actions/workflows/$WORKFLOW_ID/runs?per_page=100&page=$PAGE&status=failure" | cat)
  
  RUN_COUNT=$(echo "$RESPONSE" | jq '.workflow_runs | length')
  if [ "$RUN_COUNT" -eq 0 ]; then
    echo "🎉 No more failed runs found."
    break
  fi

  echo "$RESPONSE" | jq -r '.workflow_runs[].id' | while read -r run_id; do
    echo "🗑️ Deleting run: $run_id"
    gh api -X DELETE "repos/$OWNER/$REPO/actions/runs/$run_id" | cat
    ((TOTAL_DELETED++)) || true
  done

  ((PAGE++))
done

echo "✨ Completed cleaning failed runs for $WORKFLOW_FILE"
```

## Prerequisites
- `gh` CLI authenticated (`gh auth status`)
- `jq` installed (`sudo apt install jq`)
