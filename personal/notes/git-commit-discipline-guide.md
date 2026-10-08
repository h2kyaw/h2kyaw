---
title: "Git Commit Discipline & Conventional Commits Guide"
description: "Best practices for writing atomic, semantic conventional commits to enable automated changelogs and clean bisecting."
date: "2026-10-07"
tags: ["git", "workflow", "engineering-hygiene"]
category: "Version Control"
---

# Git Commit Discipline & Conventional Commits Guide

Maintaining an atomic, conventional git commit history ensures zero guessing, effortless git bisecting, and clean automatic changelog generation.

## 1. Conventional Commit Syntax
Format: `<type>(<scope>): <imperative summary>`

### Allowed Types
- `feat`: A new user-facing or system capability.
- `fix`: A defect or bug resolution.
- `docs`: Documentation, README, or rule additions.
- `refactor`: Internal structure change with zero behavior modification.
- `chore`: Tooling, configs, dependencies, or maintenance.
- `ci`: Continuous integration and GitHub Actions workflows.

## 2. Atomic Unit of Work Checklist
1. Only stage files directly contributing to the logical unit of work.
2. Run automated verification (lint, type-check, tests) before committing.
3. Write imperative mood messages in English ("add", "prevent", "fix").
