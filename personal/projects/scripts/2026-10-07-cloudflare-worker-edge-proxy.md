---
title: "Cloudflare Worker Edge Proxy for Script Delivery"
project: "scripts"
type: "adr"
date: "2026-10-07"
summary: "Users executing developer automation scripts previously had to run long, cumbersome GitHub URLs: bash curl -fsSL https://raw.githubusercontent.com/hhkmy/scripts/main/antigravity | ..."
tags: ["scripts","architecture","adr"]
---

# Architecture Decision Record (ADR): Cloudflare Worker Edge Proxy for Script Delivery

- **Project**: `~/Projects/scripts` (`hhkmy/scripts`)
- **Date**: 2026-10-07
- **Status**: Accepted
- **Decider(s)**: Hein Htet Kyaw

---

## 1. Context & Problem Statement

Users executing developer automation scripts previously had to run long, cumbersome GitHub URLs:
```bash
curl -fsSL https://raw.githubusercontent.com/hhkmy/scripts/main/antigravity | bash
```
We required a concise branded entry point using `scripts.hhk.my.id`:
```bash
curl -fsSL https://scripts.hhk.my.id/antigravity | bash
```

Key constraints:
1. **Zero-Redirect CLI Compatibility**: Many users run `curl https://...` without `-L` (Follow Redirects). A traditional HTTP 301/302 redirect would fail silently or output HTML redirect boilerplate into the shell.
2. **Dual-Audience Discovery**: Web browser visitors should be redirected to the GitHub repository, while terminal users (`curl`, `wget`) should see a clean script menu and catalog.
3. **Resilience & Rate Limiting**: Script delivery must not be vulnerable to GitHub raw CDN rate limits or upstream hiccups.
4. **Automated CI/CD**: Pushing script or proxy updates to GitHub must automatically deploy to the edge without manual dashboard intervention.

---

## 2. Decision

We implemented a **Cloudflare Worker Edge Reverse Proxy** (`scripts-proxy`) routed at `scripts.hhk.my.id`, managed directly within the `hhkmy/scripts` repository, and deployed via a dedicated GitHub Actions CI/CD pipeline using `cloudflare/wrangler-action@v3`.

---

## 3. Architecture & Technical Design

### 1. Smart User-Agent Routing
- **Terminal Clients (`curl`, `wget`, `httpie`)**:
  - Root (`/`): Returns an ASCII-formatted CLI catalog banner detailing available scripts and usage examples.
  - Script path (`/<name>`): Streams the shell script directly with `Content-Type: text/plain; charset=utf-8`.
- **Web Browsers**:
  - Root (`/`): Returns a 302 redirect to `https://github.com/hhkmy/scripts`.

### 2. Edge Caching & Observability
- Integrated with Cloudflare Edge Cache (`caches.default`) with a 5-minute TTL (`public, max-age=300, s-maxage=300`).
- Enabled 100% Observability logging (`head_sampling_rate = 1` in `wrangler.toml`) capturing cache hit/miss rates, 404 queries, and upstream error statuses.
- Supports `GET`, `HEAD` (for health checkers / `curl -I`), and CORS preflight `OPTIONS`.

### 3. CI/CD Deployment Pipeline
- Worker code (`worker/index.js`) and configuration (`wrangler.toml`) are tracked in the root repository.
- GitHub Actions workflow (`.github/workflows/deploy-worker.yml`) triggers on pushes affecting the worker, deploying via Cloudflare API token.

---

## 4. Alternatives Considered

| Approach | Pros | Cons | Decision |
| :--- | :--- | :--- | :--- |
| **Cloudflare Redirect Rules (302)** | Zero code, native dashboard config | Fails if user runs `curl` without `-L`; cannot detect CLI vs browser; no custom terminal banner. | Rejected |
| **GitHub Pages Custom Domain** | Free static hosting | Enforces HTML/Jekyll wrappers; raw content headers require extra configuration; slower propagation. | Rejected |
| **Cloudflare Worker Reverse Proxy** | Streaming plain-text, instant caching, User-Agent intelligence, custom domain integration. | Requires Worker code and CI/CD secret management. | **Accepted** |

---

## 5. Consequences & Implementation Impact

- **Terminal UX**: Commands are now drastically shortened (`scripts.hhk.my.id/antigravity`).
- **Zero Breakage**: Fallback raw GitHub URLs remain functional in documentation.
- **Maintenance**: Repository is a unified monorepo for scripts and their delivery proxy.
- **Repository Additions**:
  - `worker/index.js`
  - `wrangler.toml` & `wrangler.jsonc`
  - `.github/workflows/deploy-worker.yml`
  - `README.md` updated with primary `scripts.hhk.my.id` URLs.
