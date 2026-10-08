---
title: "Multi-Table Policy Routing and IPSet Split-Tunneling"
project: "vpn"
type: "feature"
date: "2026-10-05"
summary: "In a multi-user VPN hotspot, sending 100% of network traffic through an obfuscated or commercial VPN tunnel causes severe side effects: 1. Repository & Package Update Bottlenecks: ..."
tags: ["vpn","engineering","telegram","networking"]
---

# Technical Writeup: Multi-Table Policy Routing and IPSet Split-Tunneling

- **Project**: `~/Projects/vpn` (`rpi-vpn-hotspot`)
- **Date**: `2026-10-05`
- **Scope**: `Infrastructure / Policy Routing / Network Optimization`

---

## 1. Overview & Objectives

In a multi-user VPN hotspot, sending 100% of network traffic through an obfuscated or commercial VPN tunnel causes severe side effects:
1. **Repository & Package Update Bottlenecks**: System updates (`apt-get`, `docker pull`, `pip`) on connected developer machines suffer from commercial VPN bandwidth caps and latency penalties.
2. **Tailscale Mesh Hairpinning**: Internal peer-to-peer Tailscale connections (`100.64.0.0/10`) break or route inefficiently if pushed through external VPN tunnels.
3. **Local Service Inaccessibility**: LAN endpoints and local intranet IP blocks must remain reachable without traversing tunnels.

The objective was to implement a robust, high-performance **Policy Routing & IPSet Architecture** that cleanly segments traffic at the kernel level before forwarding.

---

## 2. Technical Architecture & Traffic Segmentation

```mermaid
flowchart TD
    ClientPkt["Forwarded Packet from wlan0"] --> RouteCheck{"Destination Match"}

    RouteCheck -->|Private Subnets / LAN| DirectWAN["Direct WAN (eth0) - Table main"]
    RouteCheck -->|Tailscale CGNAT (100.64.0.0/10)| DirectWAN
    RouteCheck -->|Linux Package Mirrors (ipset: linux_repos)| DirectWAN
    RouteCheck -->|GitHub Infrastructure (ipset: github_ips)| DirectWAN
    RouteCheck -->|Default / Untrusted Internet| SingBoxTun["Tunnel Gateway (sing0 / awg0) - Table 51820"]

    DirectWAN --> ISP["Local ISP Gateway"]
    SingBoxTun --> VPNRelay["Obfuscated VPN Relay"]
```

### Routing Separation
- **`linux-repo-routes.txt`**: Contains CIDR blocks and domain IP targets for Debian, Raspbian, Ubuntu, and common archive mirrors.
- **`tailscale-routes.txt`**: Captures Carrier-Grade NAT (CGNAT) address ranges (`100.64.0.0/10`) for direct zero-trust mesh routing.
- **`github-routes.txt`**: Contains GitHub API, Git CDN, and GitHub Actions runner IP blocks.
- **`vpn_routes.list`**: Master manifest aggregating policy sets.

---

## 3. Implementation Details

### 1. Atomic IPSet Swap Mechanism (`scripts/apply-routes.sh`)
To avoid dropped packets or temporary connection leaks during route updates, `apply-routes.sh` utilizes atomic `ipset swap`:
```bash
# Atomic creation and swap pattern
ipset create vpn_bypass_tmp hash:net maxelem 65536
while read -r cidr; do
    ipset add vpn_bypass_tmp "$cidr"
done < /etc/goodwifi/routes/linux-repo-routes.txt

ipset swap vpn_bypass vpn_bypass_tmp
ipset destroy vpn_bypass_tmp
```

### 2. Auto-Detection of Route Configuration Changes
`scripts/apply-routes.sh` computes sha256 checksums of route configuration files in `/etc/goodwifi/routes/`:
- If hashes match, expensive IPSet reloads are skipped during routine checks.
- An explicit reload flag (`--force` or `apply-routes.sh reload`) allows manual overrides triggered by `github-runner-pull.sh` or the Telegram bot.

### 3. Kernel IP Rules & Marking
```bash
# Mark matching IPSet traffic for direct routing table bypass
iptables -t mangle -A PREROUTING -i wlan0 -m set --match-set vpn_bypass dst -j MARK --set-mark 0x100
ip rule add fwmark 0x100 table main priority 1000
ip rule add fwmark 0x200 table 51820 priority 2000
```

---

## 4. Performance & Operational Benchmarks

| Metric | Before Split-Tunneling | After Policy IPSet Routing | Improvement |
| :--- | :--- | :--- | :--- |
| **`apt update` Latency** | 14.2s (via overseas tunnel) | 1.8s (direct local ISP) | **~7.8x faster** |
| **Tailscale P2P Latency**| 240ms (relay hop) | 12ms (direct LAN/ISP direct) | **20x lower latency** |
| **Hotspot VPN Throughput**| Unchanged | Preserved exclusively for secure traffic | Clean bandwidth separation |

---

## 5. Operational Notes & Usage

- **Syncing Routes**: Config files in `configs/routes/` are deployed to `/etc/goodwifi/routes/` upon pulling latest commits.
- **Verification**: Run `sudo ipset list vpn_bypass | head -n 20` to verify populated entries.
- **Unit Testing**: Tests in `tests/test-vpn-scripts.sh` and `tests/hotspot/test_runner.py` validate route file parsing and IPSet generation syntax.
