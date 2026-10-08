---
title: "Linux IPSet Split Tunneling & Policy Routing Rules"
category: "Networking"
language: "sh"
summary: "Production routing one-liners and ipset automation for splitting traffic between local ISP gateway and VPN proxy tunnel."
tags: ["networking", "ipset", "policy-routing", "vpn", "linux"]
---

# Linux IPSet Split Tunneling & Policy Routing Rules

Practical networking snippets for configuring kernel `ipset` hash sets, policy routing tables (`ip rule`), and `iptables` marks on Linux gateway routers.

## 1. Initializing IPSet Tables

```bash
#!/bin/bash
# Create kernel hash sets for selective routing (CIDR and IP lookups)
sudo ipset create local_routes hash:net family inet hashsize 1024 maxelem 65536 -exist
sudo ipset create vpn_routes hash:net family inet hashsize 1024 maxelem 65536 -exist
sudo ipset create vpn_domains hash:ip family inet hashsize 1024 maxelem 65536 -exist

# Add domestic or bypass CIDRs to local set
sudo ipset add local_routes 192.168.0.0/16 -exist
sudo ipset add local_routes 10.0.0.0/8 -exist
```

## 2. Policy Routing Tables (`ip rule`)

```bash
# Add custom routing table 100 for VPN tunnel traffic
if ! grep -q "100 vpn_table" /etc/iproute2/rt_tables; then
  echo "100 vpn_table" | sudo tee -a /etc/iproute2/rt_tables
fi

# Route firewall marked packets (mark 0x1) through VPN gateway
sudo ip rule add fwmark 0x1 lookup vpn_table priority 1000 2>/dev/null || true

# Direct VPN table default route through tun0 / singbox interface
sudo ip route replace default dev tun0 table vpn_table
```

## 3. IPTables Packet Marking

```bash
# Mark packets destined for VPN ipset targets
sudo iptables -t mangle -A PREROUTING -m set --match-set vpn_routes dst -j MARK --set-mark 0x1
sudo iptables -t mangle -A PREROUTING -m set --match-set vpn_domains dst -j MARK --set-mark 0x1

# Bypass local targets
sudo iptables -t mangle -A PREROUTING -m set --match-set local_routes dst -j ACCEPT
```

## 4. Diagnostics & Inspection
```bash
# List active rules in routing policy database
ip rule show

# Inspect IP count inside an ipset
ipset list vpn_routes -terse
```
