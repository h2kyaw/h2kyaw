---
title: "Linux Server Hardening, SSH Security & UFW Best Practices"
description: "Comprehensive runbook for securing Debian/Ubuntu production VPS servers, configuring UFW, and locking down SSH access."
date: "2026-10-07"
tags: ["linux", "security", "devops", "sysadmin"]
category: "Infrastructure"
---

# Linux Server Hardening & SSH Security

Securing Linux production servers is fundamental to preventing automated brute-force attacks, unauthorized daemon access, and supply-chain vulnerabilities.

## 1. SSH Hardening (`/etc/ssh/sshd_config.d/99-hardened.conf`)
Always enforce modern cryptographic key exchange and disable password logins:

```bash
# Disable passwords and root login
PermitRootLogin prohibit-password
PasswordAuthentication no
PubkeyAuthentication yes
KbdInteractiveAuthentication no

# Restrict to Ed25519 & modern curve keys
HostKeyAlgorithms ssh-ed25519,sk-ssh-ed25519@openssh.com
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org
```

After modifying, test syntax before restarting the daemon:
```bash
sudo sshd -t && sudo systemctl reload ssh
```

## 2. UFW Firewall Baseline
Enforce a default-deny ingress policy:

```bash
# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow necessary ports
sudo ufw allow 22/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# Enable firewall
sudo ufw enable
sudo ufw status verbose
```

## 3. Kernel Sysctl Network Protection (`/etc/sysctl.d/99-security.conf`)
```ini
# Ignore ICMP echo broadcasts
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Disable IP source routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0

# Enable SYN flood protection
net.ipv4.tcp_syncookies = 1
```
Apply with `sudo sysctl --system`.
