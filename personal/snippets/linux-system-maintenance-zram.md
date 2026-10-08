---
title: "Linux Memory Audit & ZRAM Swap Healthcheck"
category: "Linux"
language: "sh"
summary: "System maintenance script for Linux hosts to drop page cache, audit top memory processes, and verify or recover active ZRAM swap devices."
tags: ["linux", "zram", "sysadmin", "bash"]
---

# Linux Memory Audit & ZRAM Swap Healthcheck

Practical maintenance and diagnostic script for resource-constrained Linux servers and development workstations running compressed ZRAM swap.

## System Maintenance Routine

```bash
#!/bin/bash
set -euo pipefail

echo "=== System Maintenance Routine ==="
echo "Host: $(hostname) | Time: $(date)"
echo ""

# 1. Drop cached dentries and inodes (RAM reclaim)
echo "1. Reclaiming kernel page cache..."
sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches'

# 2. Memory overview
echo ""
echo "2. RAM Overview:"
free -h

# 3. Swap devices check
echo ""
echo "3. Active Swap Devices:"
cat /proc/swaps

# 4. Top memory consumers
echo ""
echo "4. Top 5 Processes by RAM Consumption:"
ps aux --sort=-%mem | head -6

# 5. ZRAM Healthcheck and auto-restart fallback
echo ""
echo "5. Verifying ZRAM Status:"
if grep -q zram0 /proc/swaps; then
  echo "✅ ZRAM device (zram0) is active and mounted."
else
  echo "❌ ZRAM is missing from active swaps! Attempting recovery..."
  sudo systemctl restart zramswap || sudo systemctl restart systemd-zram-setup@zram0.service
fi

echo ""
echo "=== Maintenance Complete ==="
```

## Useful Diagnostic One-Liners
```bash
# Check compressed ZRAM memory algorithm and ratio
zramctl

# Monitor real-time memory pressure
vmstat 1 5
```
