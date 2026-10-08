---
title: "Docker Compose in Production: Multi-Arch, Rootless & Health Checks"
description: "Production architectural guidelines for containerizing Node.js and Python microservices with multi-stage Dockerfiles and compose specs."
date: "2026-10-07"
tags: ["docker", "devops", "containers", "ci-cd"]
category: "DevOps"
---

# Docker Compose in Production: Hardened Architecture

Running containerized services reliably on self-hosted VPS or Raspberry Pi environments requires defensive configuration.

## 1. Multi-Stage Build Pattern
Avoid shipping build dependencies (TypeScript compiler, C toolchains, npm caches) in final production images:

```dockerfile
# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Stage 2: Runtime
FROM node:22-alpine AS runner
WORKDIR /app
USER node
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```

## 2. Production Docker Compose Safeguards
```yaml
services:
  app:
    image: my-service:latest
    restart: unless-stopped
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    security_opt:
      - no-new-privileges:true
```
