---
title: "Dual-Role MTProto Architecture & Dispatcher Pipeline"
project: "hhkbot"
type: "adr"
date: "2026-09-30"
summary: "Digital shops and e-commerce workflows on Telegram experience high volumes of customer interactions, requiring automated answering, order registration, and strict group management."
tags: ["hhkbot","architecture","adr","telegram"]
---

# Architecture Decision Record (ADR): Dual-Role MTProto Architecture & Dispatcher Pipeline

- **Project**: `~/Projects/hhkbot`
- **Date**: `2026-09-30`
- **Status**: Accepted
- **Decider(s)**: Hein Htet Kyaw

---

## 1. Context & Problem Statement
Digital shops and e-commerce workflows on Telegram experience high volumes of customer interactions, requiring automated answering, order registration, and strict group management. 

Traditional bots built exclusively on the HTTP Telegram Bot API suffer from significant limitations:
1. They cannot read or reply directly on personal/business chat accounts (requiring customers to leave private chats and message a separate bot username).
2. They cannot leverage Telegram Business shortcuts, native business quick replies, or personal custom emoji styling.
3. HTTP webhook latency and polling introduce jitter during high traffic spikes.

A unified architecture was needed that enables automated interactions on personal business accounts while simultaneously serving as an administrator in group chats.

---

## 2. Decision
We chose a **Dual-Role Binary MTProto Architecture** implemented via Node.js 22 LTS and `@mtcute`:
1. **Direct MTProto Protocol**: Replace HTTP Bot API with raw TCP/TLS MTProto protocol using `@mtcute/node`, eliminating HTTP polling overhead and webhooks.
2. **Dual-Role Client Instances**:
   - **Business Userbot**: Logs into the business owner's Telegram account to monitor private chats, execute business quick replies, log customer transactions, and automate support with Google Gemini AI.
   - **Assistant Bot**: Operates as a Telegram Bot with an `@mtcute/dispatcher` router stack to manage public/private groups, handle inline keyboards, and process admin commands.
3. **Pure PostgreSQL Persistence**:
   - Store binary MTProto session keys, peer caches, and auth tokens natively in PostgreSQL using `@mtcute/postgres`.
   - Prevent multi-container race conditions and session corruption using a singleton database lock (`instance_lock`).
4. **Pre-Update Middleware Chain**:
   - Install deduplication and circuit-breaker filters at the ingress network boundary before dispatching updates to domain routers.

---

## 3. Rationale & Trade-offs
- **High Throughput & Low Latency**: Binary MTProto over TCP delivers sub-50ms message processing times compared to 200–500ms over HTTP webhooks.
- **Native Telegram Business Power**: Access to custom emojis, business connections, and userbot actions without exposing customer communication to third-party SaaS tools.
- **Accepted Complexity**: Managing session authentication and two distinct MTProto clients requires rigorous lifecycle teardown, error recovery, and database connection pooling.

---

## 4. Alternatives Considered
- **Telegraf / GrammY (HTTP Bot API)**: Standard and easy to deploy, but completely incapable of acting as a Telegram Business Userbot or handling personal direct messages.
- **Telethon / Pyrogram (Python)**: Mature MTProto implementations, but lack native integration with our TypeScript/Node.js ecosystem and have higher memory footprints under concurrent asyncio tasks.
- **GramJS (JavaScript)**: Lacks modern ESM, has outdated type definitions, and lacks first-class PostgreSQL session drivers.

---

## 5. Consequences & Implementation Impact
- Implemented modular dispatcher trees under `src/bot/` (Bot router) and `src/user/` (Userbot router).
- Established database schema migrations (`src/database/migrations/001-core-schema.ts`) storing sessions, contacts, transactions, and group configurations.
- Integrated singleton startup checks in `src/index.ts` to ensure only one bot instance connects with the primary session at any given time.
