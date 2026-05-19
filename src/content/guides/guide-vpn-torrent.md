---
title: "VPN et torrent : setup complet"
description: "Quel VPN choisir, comment configurer le kill switch, et comment binder qBittorrent à l'interface VPN pour ne jamais leaker son IP."
date: 2026-03-10
categorie: privacy
niveau: avance
tags:
  - vpn
  - torrent
  - mullvad
  - qbittorrent
  - kill-switch
draft: false
---

## Pourquoi un VPN pour le torrent

En téléchargeant un torrent, ton IP est visible par tous les autres seeders/leechers dans le swarm. Des organisations (en France : l'ARCOM, ex-HADOPI) collectent ces IPs et envoient des avertissements aux abonnés concernés.

Un VPN remplace ton IP par celle du serveur VPN. Sans VPN binding correct, une coupure VPN expose temporairement ta vraie IP.

## Quel VPN

**Mullvad** est la recommandation principale :
- Pas de logs, pas de compte email requis
- Paiement en espèces ou crypto possibles
- WireGuard natif (rapide, moderne)
- Kill switch natif dans l'app
- Audité de manière indépendante

Alternatives sérieuses : ProtonVPN (plus accessible, gratuit limité), IVPN.

Évite : NordVPN (marketing > tech), ExpressVPN (racheté par Kape), tout VPN gratuit.

## Configurer Mullvad

Installe l'app depuis [mullvad.net](https://mullvad.net). Achète du temps (pas de compte — juste un numéro). Connecte-toi sur un serveur.

**Kill switch :**
`Settings > VPN settings > Kill switch > On`

Le kill switch coupe tout le trafic si le VPN se déconnecte. Indispensable.

**Custom DNS :**
`Settings > VPN settings > Use custom DNS → 10.64.0.1` (DNS Mullvad interne)

## VPN binding dans qBittorrent

C'est la couche de sécurité supplémentaire : qBittorrent n'utilise que l'interface réseau du VPN. Si le VPN est coupé, qBittorrent ne télécharge plus du tout.

Dans qBittorrent :
`Outils > Options > Avancé > Interface réseau`

Sélectionne l'interface correspondant à Mullvad (souvent nommée `Mullvad` ou `tun0` sur Linux).

**Vérification :**
1. Connecte le VPN
2. Lance qBittorrent
3. Télécharge un torrent
4. Déconnecte le VPN → le téléchargement doit s'arrêter
5. Reconnecte → reprend automatiquement

## Vérifier les leaks

Sur [ipleak.net](https://ipleak.net) :
- Ton IP publique doit être celle de Mullvad
- Le test WebRTC ne doit pas montrer ta vraie IP
- Les DNS doivent correspondre au pays du serveur Mullvad

## WireGuard vs OpenVPN

WireGuard est plus rapide et plus moderne. Utilise-le par défaut dans Mullvad. OpenVPN reste utile sur les réseaux qui bloquent WireGuard (hôtels, certains ISP).

## Split tunneling

Si tu veux que seulement qBittorrent passe par le VPN (et le reste de ta connexion directement) :

Dans Mullvad → `Settings > Split tunneling` → active uniquement qBittorrent.

Inverse logiquement aussi possible : tout passe par le VPN, sauf les apps listées.

## Performances

Un bon VPN avec WireGuard introduit 5 à 20% de latence supplémentaire mais ne limite pas vraiment le débit download/upload pour le torrent. Si tu constates une grosse perte de vitesse, change de serveur — prends le plus proche géographiquement.
