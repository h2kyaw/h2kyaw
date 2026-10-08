---
title: "AdGuard DNS Leak and DoH/DoT Bypass on VPN Switch"
project: "vpn"
type: "postmortem"
date: "2026-10-05"
summary: "During active use and automated switching between VPN backends (VLESS Reality, OpenVPN, WireGuard), client devices connected to the Wi-Fi hotspot intermittently experienced ad-bloc..."
tags: ["vpn","postmortem","debugging","telegram","networking"]
---

# Debug Postmortem: AdGuard DNS Leak and DoH/DoT Bypass on VPN Switch

- **Project**: `~/Projects/vpn` (`rpi-vpn-hotspot`)
- **Date**: `2026-10-05`
- **Severity / Impact**: `High` (Security & Privacy Degraded - Ads and Tracking Leaked)
- **Status**: `Resolved`

---

## 1. Executive Summary

During active use and automated switching between VPN backends (VLESS Reality, OpenVPN, WireGuard), client devices connected to the Wi-Fi hotspot intermittently experienced ad-blocking failure. Ad trackers were loading on client browsers (Chrome, Safari), and telemetry showed DNS queries bypassing the local AdGuard Home sinkhole (`192.168.4.1:53`).

Investigation identified that clients with modern DoH (DNS-over-HTTPS) or DoT (DNS-over-TLS) configurations, alongside Apple Private Relay on iOS devices, were circumventing standard port 53 NAT redirection. The issue was resolved by injecting strict port 853 ICMP rejects, blocking Apple Private Relay hostnames, maintaining an IPSet DoH blocklist, and synchronizing AdGuard Home configuration states on every tunnel switch.

---

## 2. Problem Symptoms & Trigger

- **Trigger**: Switching VPN profiles via the Telegram Bot (`/vpn` -> select Country or Protocol) or automatic failover.
- **Observed Behavior**:
  - Webpages loaded ads that were normally filtered by AdGuard Home.
  - DNS leak test tools on connected clients revealed upstream ISP or third-party DNS resolvers instead of the Raspberry Pi's local AdGuard instance.
  - iOS devices showed "Private Relay is active", completely bypassing LAN DNS inspection.

---

## 3. Investigation & Root Cause Analysis (RCA)

1. **DoT (Port 853) Bypass**:
   While `iptables` had a `PREROUTING -p udp --dport 53 -j REDIRECT --to-ports 53` rule, port 853 (DNS-over-TLS) was traversing the `FORWARD` chain directly through the active tunnel. Android's "Private DNS" and modern OS resolvers prioritized port 853 TLS handshakes, completely bypassing local UDP/53.

2. **Apple Private Relay**:
   iOS and macOS devices systematically establish dual-hop QUIC/TLS tunnels to Cloudflare/Fastly relays for all Safari web traffic if `mask.icloud.com` resolves successfully, evading LAN DNS sinkholing entirely.

3. **DoH Fallback via Tunnel**:
   When standard DNS queries were routed through commercial VPN tunnels, browser-embedded DoH resolvers (Cloudflare `1.1.1.1/dns-query`, Google `8.8.8.8/resolve`) bypassed the gateway because their destination was standard port 443 HTTPS.

4. **Filter Sync Inconsistency**:
   On backend switching, AdGuard Home daemon filters were occasionally desynchronized from the host runner files, causing DNS query forwarders to use default tunnel DNS rather than enforcing blocklists.

---

## 4. Resolution & Fix

### Firewall & Policy Rules (`configs/90-hotspot-vpn-policy` & `scripts/apply-routes.sh`)
Inserted strict reject rules at the very top of the `FORWARD` chain:
```bash
# 1. Reject DNS-over-TLS immediately so clients fall back to port 53 UDP
iptables -I FORWARD 1 -i wlan0 -p tcp --dport 853 -j REJECT --reject-with icmp-port-unreachable
iptables -I FORWARD 2 -i wlan0 -p udp --dport 853 -j REJECT --reject-with icmp-port-unreachable

# 2. Redirect all port 53 queries strictly to AdGuard Home instance
iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 53 -j REDIRECT --to-ports 53
iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 53 -j REDIRECT --to-ports 53
```

### Apple Private Relay Mitigation & DoH Blocks
- Configured AdGuard Home to return `NXDOMAIN` for:
  - `mask.icloud.com`
  - `mask-h2.icloud.com`
  - `mask-api.icloud.com`
  *(This prompts iOS to gracefully disable Private Relay for the local Wi-Fi SSID, maintaining normal ad-blocking behavior).*
- Maintained an automated IPSet blocklist for known public DoH bootstrap IPs.

### Programmatic Sync & Recovery (`scripts/hotspot/adguard.py`)
- Added `ensure_adguard_protection()` to verify that AdGuard Home is active and upstream resolvers point strictly to the healthy proxy endpoint on every VPN backend switch.
- Implemented YAML filter sanitization and auto-recovery routines.

---

## 5. Prevention & Future Reference

1. **Automated Verification**: Added unit tests in `tests/hotspot/test_adguard.py` mocking port 853 reject rules and verifying fallback behaviors.
2. **Key Takeaway**: In any secure router / hotspot setup, simply redirecting port 53 UDP is insufficient. All modern encrypted DNS protocols (DoT on 853, DoH IP endpoints, Apple Private Relay) must be explicitly rejected at the gateway firewall to prevent silent bypasses.
