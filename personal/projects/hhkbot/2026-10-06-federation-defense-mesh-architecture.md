---
title: "Enterprise Federation 2.0 & Defense Mesh"
project: "hhkbot"
type: "adr"
date: "2026-10-06"
summary: "Community administrators managing multiple Telegram groups needed a centralized ban and threat management system similar to Miss Rose Federations."
tags: ["hhkbot","architecture","adr","telegram"]
---

# Architecture Decision Record (ADR): Enterprise Federation 2.0 & Defense Mesh

- **Project**: `~/Projects/hhkbot`
- **Date**: `2026-10-06`
- **Status**: Accepted
- **Decider(s)**: Hein Htet Kyaw

---

## 1. Context & Problem Statement
Community administrators managing multiple Telegram groups needed a centralized ban and threat management system similar to Miss Rose Federations. 

Initial implementations and simple shared lists had critical vulnerabilities:
1. Identifying federations by arbitrary string names caused collisions and made renames difficult.
2. Single-owner bottlenecks prevented distributed admin teams from managing multi-group bans cooperatively.
3. Spammers banned in one linked group could freely raid sister groups until manual administrative action was triggered.
4. Verbose notification broadcasts cluttered group discussions with spam ban alerts.

---

## 2. Decision
We designed and implemented **Enterprise Federation 2.0 with a Decentralized Threat Defense Mesh**:
1. **Immutable UUID Architecture**:
   - Every federation is assigned a permanent `UUIDv4` identifier upon creation (`/newfed <name>`).
   - Federations can be renamed, transferred, or subscribed to without breaking foreign key associations across linked chats.
2. **Role-Based Admin Delegation**:
   - Owners can appoint federated admins (`/fpromote`, `/fdemote`) with scoped privileges.
   - Comprehensive audit logging records ban issuer ID, reason, and original federation tag.
3. **Automated Cross-Chat Threat Propagation**:
   - When a user is banned via `/fban <user> [reason]`, the defense mesh asynchronously propagates the ban to all registered chats in the federation.
   - High-threat entities are queued into a background punishment worker to avoid API rate limiting.
4. **Quiet Federation (`quietfed`) & Dedicated Fed Notifications (`fednotif`)**:
   - Groups can enable `quietfed` (`/quietfed on`) to completely suppress automated ban announcements in chat.
   - Audit logs can be routed to a designated federation log channel (`/setfedlog <channel_id>`) or subscribed chat (`/fednotif`).

---

## 3. Rationale & Trade-offs
- **Resilience Against Mass Spammers**: Banning a malicious user in one group immediately neutralizes them across the entire network of partner communities.
- **Clean Chat Aesthetics**: Quiet federation eliminates repetitive ban notices, keeping group feeds focused on user conversation.
- **Accepted Trade-off**: Asynchronous broadcast across dozens of groups requires exponential backoff handling to comply with Telegram MTProto FloodWait limits.

---

## 4. Alternatives Considered
- **Centralized Global Ban List (Gban)**: Global bans affect all groups unconditionally. This was rejected because community owners require sovereign control over which trust networks they opt into.
- **Local In-Memory Cache**: Rejected because server restarts or container re-creations would drop synchronization state across groups.

---

## 5. Consequences & Implementation Impact
- Introduced PostgreSQL migrations `010-federated-defense-mesh.ts`, `014-enterprise-federation-2.ts`, and `018-quiet-fed-and-fednotif.ts`.
- Implemented core services in `src/bot/federation/mesh-service.ts`, `src/bot/federation/fed-defense.ts`, and `src/database/federation.ts`.
- Added command routers supporting `/fban`, `/unfban`, `/fpromote`, `/fdemote`, `/fedinfo`, `/chatfed`, `/joinfed`, `/leavefed`, `/quietfed`, and `/myfeds`.
