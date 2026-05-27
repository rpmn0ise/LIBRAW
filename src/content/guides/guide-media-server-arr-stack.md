---
title: "Monter son serveur média automatisé avec la stack *Arr"
description: "Déployer un serveur de streaming personnel (Plex ou Jellyfin) entièrement automatisé avec Docker, qBittorrent, Sonarr, Radarr et Prowlarr, en protégeant son IP via un VPN."
date: 2026-05-27
categorie: download
niveau: intermediaire
draft: false
---

## Pourquoi ce guide existe

L'idée est simple : avoir un service de streaming personnel qui récupère, organise et diffuse des contenus automatiquement — sans renommer les fichiers à la main, sans doublons sur le disque, et sans exposer son adresse IP réelle. La **stack *Arr** est la réponse de la communauté self-hosting à ce besoin. Elle est mature, bien documentée, et entièrement conteneurisée via Docker.

Ce guide couvre l'architecture recommandée pour 2026 : Gluetun (VPN), qBittorrent, Prowlarr, Sonarr, Radarr et Plex/Jellyfin — le tout avec les **hardlinks** pour ne pas dupliquer les fichiers sur le disque.

## Prérequis

- Linux (Ubuntu/Debian recommandé), NAS compatible Docker, ou tout serveur x86
- Docker et Docker Compose installés
- Un abonnement VPN compatible port forwarding : PIA, AirVPN ou ProtonVPN (recommandés pour Gluetun)
- Environ 10 Go d'espace pour les configurations, plus l'espace disque pour vos médias
- Niveau intermédiaire : à l'aise avec le terminal et les fichiers de configuration

## Architecture

```
Internet
   │
   ▼
[Gluetun]  ← Tunnel VPN, isole tout le trafic torrent
   │
   ├── [qBittorrent]  ← Téléchargements (réseau = Gluetun)
   │
   ├── [Prowlarr]     ← Gestion centralisée des indexers
   ├── [Sonarr]       ← Automatisation séries
   ├── [Radarr]       ← Automatisation films
   │
   └── [Plex / Jellyfin]  ← Streaming vers vos appareils
```

**Principe des hardlinks** : tous les conteneurs partagent un volume `/data` unique. Quand Sonarr "déplace" un fichier de `/data/torrents/downloads` vers `/data/media/tv`, aucune copie n'a lieu sur le disque — c'est instantané et sans duplication. Pour que cela fonctionne, les dossiers sources et destinations **doivent être sur le même système de fichiers**.

## Installation

### 1. Créer la structure de dossiers

```bash
# Structure unifiée sur un seul disque/partition
sudo mkdir -p /data/torrents/{downloads,cross-seed}
sudo mkdir -p /data/media/{movies,tv}

# Donner les droits à votre utilisateur
sudo chown -R $USER:$USER /data
sudo chmod -R 775 /data
```

> ⚠️ Ne jamais séparer `/data/torrents` et `/data/media` sur deux disques différents — les hardlinks ne fonctionneraient plus.

### 2. Créer le fichier `.env`

Créez un fichier `.env` dans le même dossier que votre `compose.yml` :

```env
# Récupérez vos IDs avec la commande `id` dans le terminal (souvent 1000)
PUID=1000
PGID=1000
TZ=Europe/Paris

# Chemins
CONFIG_DIR=./config
DATA_DIR=/data

# VPN (exemple PIA — adaptez pour AirVPN ou ProtonVPN)
VPN_USER=p1234567
VPN_PASSWORD=mon_mot_de_passe

# Plex (token récupéré sur https://www.plex.tv/claim/ — valable 4 minutes)
PLEX_CLAIM=claim-xxxxxxxxx
```

### 3. Créer le `compose.yml`

```yaml
services:

  # ── VPN ────────────────────────────────────────────────────────────────
  gluetun:
    image: qmcgaw/gluetun
    container_name: gluetun
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    environment:
      - VPN_SERVICE_PROVIDER=private internet access
      - VPN_TYPE=openvpn
      - OPENVPN_USER=${VPN_USER}
      - OPENVPN_PASSWORD=${VPN_PASSWORD}
      - SERVER_REGIONS=Netherlands
      - VPN_PORT_FORWARDING=on
      # Met à jour automatiquement le port d'écoute de qBittorrent
      - VPN_PORT_FORWARDING_UP_COMMAND=/bin/sh -c 'wget -O- --retry-connrefused --post-data "json={\"listen_port\":{{PORT}}}" http://127.0.0.1:8080/api/v2/app/setPreferences 2>&1'
    ports:
      - 8080:8080   # qBittorrent WebUI
      - 7476:7476   # Qui WebUI
    volumes:
      - ${CONFIG_DIR}/gluetun:/gluetun
    restart: always

  # ── Client torrent ──────────────────────────────────────────────────────
  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    network_mode: service:gluetun   # Tout le trafic passe par le VPN
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
      - WEBUI_PORT=8080
    volumes:
      - ${CONFIG_DIR}/qbittorrent:/config
      - ${DATA_DIR}/torrents:/data/torrents
    restart: always

  # ── Automatisation ──────────────────────────────────────────────────────
  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${CONFIG_DIR}/prowlarr:/config
    ports:
      - 9696:9696
    restart: always

  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: sonarr
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${CONFIG_DIR}/sonarr:/config
      - ${DATA_DIR}:/data   # Accès à tout /data pour les hardlinks
    ports:
      - 8989:8989
    restart: always

  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${CONFIG_DIR}/radarr:/config
      - ${DATA_DIR}:/data
    ports:
      - 7878:7878
    restart: always

  # ── Streaming ───────────────────────────────────────────────────────────
  plex:
    image: lscr.io/linuxserver/plex:latest
    container_name: plex
    network_mode: host
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
      - VERSION=docker
      - PLEX_CLAIM=${PLEX_CLAIM}
    volumes:
      - ${CONFIG_DIR}/plex:/config
      - ${DATA_DIR}/media:/data/media
    devices:
      - /dev/dri:/dev/dri   # Transcodage matériel Intel QuickSync — supprimez si non disponible
    restart: always

  # Interface de demande (alternative : jellyseerr pour Jellyfin)
  seerr:
    image: ghcr.io/seerr-team/seerr:develop
    container_name: seerr
    init: true
    environment:
      - TZ=${TZ}
      - PORT=5055
    ports:
      - 5055:5055
    volumes:
      - ${CONFIG_DIR}/seerr:/app/config
    restart: always
```

### 4. Lancer la stack

```bash
docker compose up -d
```

## Configuration

### qBittorrent (premier lancement)

1. Récupérez le mot de passe temporaire dans les logs :
```bash
docker logs qbittorrent
```
2. Connectez-vous sur `http://IP:8080`
3. **Options → WebUI** → cochez *Bypass authentication for clients on localhost* (indispensable pour le script de port forwarding Gluetun)
4. **Options → Téléchargements** → définissez le dossier par défaut sur `/data/torrents/downloads`

### Prowlarr → indexers centralisés

1. Accédez à `http://IP:9696`
2. **Settings → Indexers** → ajoutez vos indexers publics ou privés
3. **Settings → Apps** → ajoutez Sonarr et Radarr :
   - URL : `http://sonarr:8989` (Docker résout les noms de conteneurs)
   - Clé API : récupérable dans **Sonarr → Settings → General**

Tous les indexers configurés dans Prowlarr se synchronisent automatiquement dans Sonarr et Radarr.

### Sonarr & Radarr

Dans chaque application :

1. **Settings → Download Clients → qBittorrent**
   - Host : `qbittorrent`, Port : `8080`
   - Catégorie : `tv-sonarr` ou `movies-radarr`

2. **Settings → Root Folders**
   - Sonarr : `/data/media/tv`
   - Radarr : `/data/media/movies`

### Plex

1. Ouvrez `http://IP:32400/web`
2. Ajoutez deux bibliothèques :
   - **Séries TV** → dossier `/data/media/tv`
   - **Films** → dossier `/data/media/movies`

## Utilisation

Le flux automatisé complet, une fois configuré :

```
Vous ajoutez une série dans Sonarr
        ↓
Sonarr interroge les indexers via Prowlarr
        ↓
Le meilleur torrent est envoyé à qBittorrent (via le VPN Gluetun)
        ↓
Une fois téléchargé, Sonarr déplace et renomme le fichier (hardlink)
        ↓
Plex détecte le nouveau fichier et rafraîchit sa bibliothèque
        ↓
Le contenu apparaît dans Plex avec métadonnées et artwork
```

Pour les séries en cours, Sonarr surveille les calendriers de diffusion et télécharge automatiquement les nouveaux épisodes dès leur disponibilité, sans intervention manuelle.

## Conseils et bonnes pratiques

- **Gluetun est non-négociable** : sans lui, votre IP réelle est visible dans l'essaim torrent. Le `network_mode: service:gluetun` sur qBittorrent garantit qu'aucun trafic P2P ne sort sans VPN.
- **Choisissez un VPN avec port forwarding** : PIA, AirVPN et ProtonVPN (plan Plus) supportent cette fonctionnalité. Elle améliore significativement votre connectabilité et vos vitesses.
- **Jellyfin à la place de Plex** : si vous préférez une solution 100 % open source et sans compte obligatoire, remplacez le conteneur `plex` par `lscr.io/linuxserver/jellyfin:latest` et utilisez Jellyseerr (`ghcr.io/fallenbagel/jellyseerr:latest`) à la place de Seerr.
- **Recyclarr** : outil complémentaire pour automatiser la gestion des profils de qualité dans Sonarr/Radarr (bannir les CAMs, prioriser les WEB-DL, etc.). Recommandé une fois la stack de base fonctionnelle.
- **Conflits de ports** : si vous avez d'autres services sur le serveur, vérifiez qu'aucun port n'est déjà utilisé avant de lancer la stack (notamment 8080 si vous avez Nextcloud ou un reverse proxy).

## Ressources utiles

- [TRaSH Guides — Configuration Sonarr/Radarr/Recyclarr](https://trash-guides.info/)
- [Documentation Gluetun](https://github.com/qdm12/gluetun/wiki)
- [LinuxServer.io — Images Docker](https://docs.linuxserver.io/)
- [Servarr Wiki — Documentation officielle *Arr](https://wiki.servarr.com/)
- [Jellyfin — Alternative open source à Plex](https://jellyfin.org/)
